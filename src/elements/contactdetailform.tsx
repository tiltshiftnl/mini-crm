import { Card, CardContent, Label, Input, Button, Paragraph } from '@amsterdam/asc-ui'
import React from 'react'
import { RouteProps } from 'react-router-dom'
import ContactService, { Contact } from '../shared/contact-service'
import NoteService, { Note } from '../shared/note-service'
import './card.scss'
import { ContactCardStatic } from './contactcardstatic'

type NoteFormState = {
    noteValid: Boolean,
    formValid: Boolean,
    note: string,
    notes: Note[],
    contact?: Contact,
    formErrors: { note: string }
}

export class ContactDetailForm extends React.Component<RouteProps> {
    id: number = 0
    router: any

    readonly state: NoteFormState = {
        noteValid: false,
        formValid: false,
        note: "",
        formErrors: { note: '' },
        notes: []
    }

    componentDidMount () {
        if (this.props.location && this.props.location.state && (this.props.location?.state as any).contact) {
            this.id = (this.props.location?.state as any).contact.id
            this.setState({contact: (this.props.location?.state as any).contact},() => {
                this.noteService.retrieveNotes(this.state.contact as Contact).then((result: Note[]) => {
                    this.setState({notes: result})
                })
            })
        } else {
            this.id = (this.props as any).match.params.id
            this.contactService.retrieveContact(this.id).then((result: Contact[]) => {
                this.setState({contact: result[0]}, () => {
                    // Get notes
                    this.noteService.retrieveNotes(this.state.contact as Contact).then((result: Note[]) => {
                        this.setState({notes: result})
                    })
                })
            })
        }
    }
    contactService: ContactService
    noteService: NoteService
    constructor(props: any) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUserInput = this.handleUserInput.bind(this)
        this.noteService = new NoteService()
        this.contactService = new ContactService()
    }

    handleSubmit = (event: any) => {
        const postNote: Note = {
            id: 0,
            note: this.state.note,
            contact_id: (this.state.contact as any).id
        }
        // TODO Send it to the server!
        this.noteService.postNote(postNote).then((result: Note) => {
            this.setState({note: ""})
            this.noteService.retrieveNotes(this.state.contact as Contact).then((result: Note[]) => {
                this.setState({notes: result})
            })
        })
        event.preventDefault()
    }

    validateForm() {
        this.setState({ formValid: this.state.noteValid });
    }

    handleUserInput(e: any) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => {
                this.validateField(name, value)
            }
        )
    }

    validateField(fieldName: string, value: any) {
        let fieldValidationErrors = this.state.formErrors
        let noteValid = this.state.noteValid

        switch (fieldName) {
            case 'note':
                noteValid = value.length >= 6
                fieldValidationErrors.note = noteValid ? '' : 'Notitie is te kort (' + value.length + ")"
                break
            default:
                break
        }

        this.setState({
            formErrors: fieldValidationErrors,
            noteValid: noteValid
        }, this.validateForm);
    }

    errorClass(error: string) {
        return (error.length === 0 ? '' : 'has-error');
    }

    render() {
        return (
            <>
            {this.state.contact &&
            <ContactCardStatic {...this.state.contact}/>
            }
            <div className={'contact-card'}>
                <form onSubmit={this.handleSubmit}>
                    <Card horizontal>
                        <CardContent>
                            <div className={`${this.errorClass(this.state.formErrors.note)}`}>
                                <Label htmlFor="note" label="Nieuwe notitie:" />
                                <Input name="note" placeholder="Type de notitie..." onChange={this.handleUserInput} value={this.state.note} required />
                            </div>
                            <p />
                            <Button variant="secondary" disabled={!this.state.formValid} taskflow>Toevoegen</Button>
                        </CardContent>
                    </Card>
                </form>
            </div>
            <div className={'note-list'}>
            {this.state.notes.map((value: Note) => (
                    <Paragraph key={value.id}>{value.note}</Paragraph>
            ))}
            </div>
            </>
        )
    }
}