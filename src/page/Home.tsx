import { Button, SearchBar, Paragraph } from '@amsterdam/asc-ui'
import NoteService, { Note } from '../shared/note-service'
import React from 'react'
import TextInput from '../elements/mentions/TextInput'
import './Home.scss'

export class HomePage extends React.Component {
    filter = ""
    noteService: NoteService

    state = {
        notes: [],
        filteredNotes: []
    }

    constructor(props: any) {
        super(props);
        this.noteService = new NoteService();
        this.loadNotes("");
    }

    loadNotes = (filter: string) => {
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
        this.loadNotes(e.target.value);
    }

    render() {
        return (
            <div>
                <section style={{ padding: "1em" }}>
                    <TextInput />
                    <React.Fragment>
                        <div className={"button-bar"}>
                            <Button variant="secondary" taskflow>Opslaan</Button>
                        </div>
                    </React.Fragment>
                </section>
                <section style={{ padding: "1em"}}>
                    <SearchBar placeholder="Notitie..." autoFocus onChange={(e) => {
                        this.handleSearchInput(e)
                    }} />
                </section>
                <div className={'note-list'}>
                {this.state.notes.map((note: Note) => (
                        <Paragraph key={note.id}>{note.note}</Paragraph>
                ))}
                </div>
            </div>
        )
    }
}