import { CompactPager, SearchBar } from '@amsterdam/asc-ui'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { Contact } from '../../shared/service_contact'
import NoteService, { Note } from '../../shared/service_note'
import { School } from '../../shared/service_school'
import { Term } from '../../shared/service_term'
import { extractHashtagsWithIndices } from '../../utils'
import './list.scss'

type NoteListProps = {
    hideSearch?: boolean
    contact?: Contact
    school?: School
}

type NoteListState = {
    notes: Note[]
    filteredNotes: Note[]
    currentPage: number
}

export class NoteList extends React.Component<NoteListProps> {
    filter = ""
    pageSize = 8
    noteService: NoteService
    readonly state: NoteListState = {
        notes: [],
        filteredNotes: [],
        currentPage: 1
    }

    constructor(props: NoteListProps) {
        super(props)
        this.noteService = new NoteService()
        this.retrieveNotes("")

    }

    componentDidUpdate = (prevProps: NoteListProps) => {
        if (prevProps.contact !== this.props.contact) {
            this.retrieveNotes("")
        }
    }

    retrieveNotes = (filter: string) => {
        this.filter = filter.toLowerCase()
        if (this.props.contact) {
            // Retrieve notes for a contact?
            this.noteService.retrieveNotesContact(this.props.contact).then((notes: Note[]) => {
                this.setState({
                    filteredNotes: notes.filter((note: Note) => {
                        return note.note.toLowerCase().indexOf(this.filter) !== -1
                    }),
                    notes: notes
                })
            })
        } else if (this.props.school) {
            // Retrieve notes for a school?
            this.noteService.retrieveNotesSchool(this.props.school).then((notes: Note[]) => {
                this.setState({
                    filteredNotes: notes.filter((note: Note) => {
                        return note.note.toLowerCase().indexOf(this.filter) !== -1
                    }),
                    notes: notes
                })
            })
        } else {
            this.noteService.retrieve().then((notes: Note[]) => {
                this.setState({
                    filteredNotes: notes.filter((note: Note) => {
                        return note.note.toLowerCase().indexOf(this.filter) !== -1
                    }),
                    notes: notes,
                    currentPage: 1
                })
            })
        }

    }

    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.retrieveNotes(e.target.value)
    }

    colorNote = (note: Note) => {
        var i = 0
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

        const coloredText = _textArray.map(_t => {
            // Is it a tag?
            if (_detectedTags.indexOf(_t) > -1) {
                return <span key={`tag_${i++}`} className="tag">{_t}</span>;
            }

            // Is it a school?
            if (note.schools) {
                const isSchool: School | undefined = (note.schools as School[]).find((s: School) => s.name === _t)
                if (isSchool) {
                    return <Link key={`school_${isSchool.id}`} className="school" to={{
                        pathname: "/school/" + isSchool.id,
                        state: {
                            school: isSchool
                        }
                    }}>{_t}</Link>
                }
            }

            // Is it a contact?
            if (note.contacts) {
                const isContact: Contact | undefined = (note.contacts as Contact[]).find((c: Contact) => c.name === _t)
                if (isContact) {
                    return <Link key={`contact_${isContact.id}`} className="contact" to={{
                        pathname: "/contact/" + isContact.id,
                        state: {
                            contact: isContact
                        }
                    }}>{_t}</Link>
                }
            }

            // No, it is plain text
            return _t
        })
        return <div>{coloredText}</div>
    }

    displayDateTime = (text: string | undefined) => {
        if (text) {
            const start = moment(text).format("DD-MM-YYYY hh:mm")
            return <div key={start} className="note-start">{start}</div>
        }
        return ""
    }
    displayContactName = (note: Note) => {
        if (note.contact) {
            return <Link key={note.contact.name} className="note-contact" to={{
                pathname: "/contact/" + note.contact.id,
                state: {
                    contact: note.contact
                }
            }}>{note.contact.name}</Link>
        }
        return ""
    }

    displayNoteContacts = (note: Note) => {
        if (note.contacts && note.contacts.length > 0) {
            return <div>
                {note.contacts.map((contact: Contact) => {
                    return <Link key={contact.name} className="note-contact" to={{
                        pathname: "/contact/" + contact.id,
                        state: {
                            contact: contact
                        }
                    }}>{contact.name}</Link>
                })}
            </div>
        }
        return <></>
    }

    displayNoteTags = (note: Note) => {
        if (note.tags && note.tags.length > 0) {
            return <div className="tag-list">
                {note.tags.map((term: Term) => {
                    return <div key={term.id} className="tag tag-pad">{term.tag}</div>
                })}
            </div>
        }
        return <></>
    }

    displayNoteSchools = (note: Note) => {
        if (note.schools && note.schools.length > 0) {
            return <div>
                {note.schools.map((school: School) => {
                    return <Link key={school.id} className="school" to={{
                        pathname: "/school/" + school.id,
                        state: {
                            school
                        }
                    }}>{school.name}</Link>
                })}
            </div>
        }
        return <></>
    }

    render() {
        return <>
            {!this.props.hideSearch &&
                <SearchBar className="disable-button" placeholder="Notities filteren..." onChange={(e) => {
                    this.handleSearchInput(e)
                }} onClear={() => {
                    this.retrieveNotes("")
                }} />
            }
            <div className={'note-list'}>
                {this.state.filteredNotes && this.state.filteredNotes.map((note: Note) => (
                    <div key={`note_${note.id}`}>
                        {this.displayDateTime(note.start)}
                        <span className="note-arrow" />
                        {this.displayContactName(note)}
                        {this.colorNote(note)}
                        {this.displayNoteContacts(note)}
                        {this.displayNoteSchools(note)}
                        {this.displayNoteTags(note)}
                    </div>
                )).splice((this.state.currentPage - 1) * this.pageSize, this.pageSize)}
            </div>
            {this.state.filteredNotes.length > 5 &&
                <CompactPager
                    page={this.state.currentPage}
                    pageSize={this.pageSize}
                    collectionSize={this.state.filteredNotes.length}
                    onPageChange={(page) => this.setCurrentPage(page)}
                />}
        </>
    }

    setCurrentPage = (page: number) => {
        console.log(page)
        this.setState({
            currentPage: page
        })
    }
}