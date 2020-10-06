import { FormTitle, SearchBar } from '@amsterdam/asc-ui'
import NoteService, { Note } from '../shared/note-service'
import React from 'react'
import TextInput from '../elements/mentions/TextInput'
import './Home.scss'
import moment from 'moment'
import { extractHashtagsWithIndices } from '../utils'
import { Contact } from '../shared/contact-service'
import { School } from '../shared/school-service'
import { Link } from 'react-router-dom'

type HomePageState = {
    notes: Note[],

    filteredNotes: []
}

export class HomePage extends React.Component {
    filter = ""
    noteService: NoteService
    readonly state: HomePageState = {
        notes: [],
        filteredNotes: []
    }

    constructor(props: any) {
        super(props)
        this.noteService = new NoteService()
        this.retrieveNotes("")
    }

    retrieveNotes = (filter: string) => {
        this.filter = filter.toLowerCase()
        this.noteService.retrieveNotes().then((notes: Note[]) => {
            this.setState({
                notes: notes.filter((note: Note) => {
                    return note.note.toLowerCase().indexOf(this.filter) !== -1
                }),
                filteredNotes: notes
            })
        })

    }

    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.retrieveNotes(e.target.value)
    }

    colorNote = (note: Note) => {
        let _raw = note.note
        _raw.replace('  ', ' ').replace(' .', '.')
        const _detectedTags = extractHashtagsWithIndices(_raw).map((hashtag: any) => {
            return hashtag.hashtag
        })
        // Replace the hashtags
        for (var tag of _detectedTags) {
            _raw = _raw.replace('#' + tag, "[" + tag + "]")
        }

        if (note.contacts) {
            for (var contact of note.contacts) {
                let _contact = (contact as Contact)
                _raw = _raw.replace(_contact.name, "[" + _contact.name + "]")
            }
        }
        if (note.schools) {
            for (var school of note.schools) {
                let _school = (school as School)
                _raw = _raw.replace(_school.name, "[" + _school.name + "]")
            }
        }

        const _textArray = _raw.split(/[\][{}]/)
        var i = 0;
        const coloredText = _textArray.map(_t => {
            // Is it a tag?
            if (_detectedTags.indexOf(_t) > -1) {
                return <span key={i++} className="tag">{_t}</span>;
            }

            // Is it a school?
            if (note.schools) {
                const isSchool: School | undefined =(note.schools as School[]).find((s: School) => s.name === _t)
                if(isSchool) {
                    return <Link key={i++} className="school"  to={`/school/${isSchool.id}`}>{_t}</Link>
                }
            }

            // Is it a contact?
            if (note.contacts) {
                const isContact: Contact | undefined =(note.contacts as Contact[]).find((c: Contact) => c.name === _t)
                if(isContact) {
                    return <Link key={i++} className="contact" to={`/contact/${isContact.id}`}>{_t}</Link>
                }
            }

            // No, it is plain text
            return _t
        })
        return <div>{coloredText}</div>
    }

    displayDateTime = (text: string | undefined) => {
        var i = 0;
        if (text) {
            const start = moment(text).format("DD-MM-YYYY hh:mm")
            return <div key={i++} className="note-start">{start}</div>
        }
        return ""
    }

    displayContactName = (text: string | undefined) => {
        console.log(text)
        var i = 0;
        if (text) {
            return <div key={i++} className="note-contact">{text}</div>
        }
        return ""
    }


    updateView = () => {
        console.log("Update Notes triggered!")
        this.retrieveNotes("")
    }

    render() {
        return (
            <div className="container">
                <section>
                    <TextInput afterSubmit={this.updateView} />
                </section>
                <section>
                    <FormTitle>Logboek</FormTitle>
                    <SearchBar placeholder="Notities filteren..." onChange={(e) => {
                        this.handleSearchInput(e)
                    }} />
                    <div className={'note-list'}>
                        {this.state.notes.map((note: Note) => (
                            <div key={note.id}>{this.displayDateTime(note.start)}{this.displayContactName(note.contact?.name)}{this.colorNote(note)}</div>
                        ))}
                    </div>
                </section>

            </div>
        )
    }
}