import { SearchBar } from '@amsterdam/asc-ui'
import NoteService, { Note } from '../shared/note-service'
import React from 'react'
import TextInput from '../elements/mentions/TextInput'
import './Home.scss'
import moment from 'moment'

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

    colorNote = (text: string) => {
        const textArray = text.split(' ')
        var i = 0;
        const coloredText = textArray.map(text => {
            if ((/\B(#[a-zA-Z]+\b)(?!;)/).test(text)) {
              return <span key={i++} className="note-tag">{text}</span>;
            }
            return text + ' ';
        });
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


    updateView = () => {
        console.log("Update Notes triggered!")
        this.retrieveNotes("")
    }

    render() {
        return (
            <div className="container">
                <section>
                    <TextInput afterSubmit={this.updateView}/>
                </section>
                <section>
                    <SearchBar placeholder="Notities filteren..." onChange={(e) => {
                        this.handleSearchInput(e)
                    }} />
                    <div className={'note-list'}>
                    {this.state.notes.reverse().map((note: Note) => (
                        <div key={note.id}>{this.displayDateTime(note.start)}{this.colorNote(note.note)}</div>
                    ))}
                </div>
                </section>
                
            </div>
        )
    }
}