import React, { RefObject } from 'react'
import NoteForm from '../elements/form/form_note'
import './Home.scss'
import { NoteList } from '../elements/list/list_note'
import { FormTitle } from '@amsterdam/asc-ui'

export class HomePage extends React.Component {
    note_list_ref: RefObject<NoteList>

    constructor(props: any){
        super(props)
        this.note_list_ref = React.createRef()
    }

    updateView = () => {
        if(this.note_list_ref.current){
            this.note_list_ref.current.retrieveNotes("")
        }
    }

    render() {
        return (
            <div className="container">
                <section>
                    <NoteForm afterSubmit={this.updateView} />
                </section>
                <section>
                    <FormTitle>Logboek</FormTitle>
                    <NoteList ref={this.note_list_ref}/>
                </section>

            </div>
        )
    }
}