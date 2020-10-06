import React from 'react'
import { RouteProps } from 'react-router-dom'
import ContactService, { Contact } from '../../shared/service_contact'
import { Note } from '../../shared/service_note'
import './form.scss'
import { ContactCardStatic } from '../card/card_contact_static'
import { NoteList } from '../list/list_note'

type ContactDetailFormState = {
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

    readonly state: ContactDetailFormState = {
        noteValid: false,
        formValid: false,
        note: "",
        formErrors: { note: '' },
        notes: []
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state && (this.props.location?.state as any).contact) {
            this.setState({
                contact: (this.props.location?.state as any).contact
            })
        } else {
            this.id = (this.props as any).match.params.id
            this.contactService.retrieveContact(this.id).then(result => {
                this.setState({
                    contact: result
                })
            })
        }
    }
    contactService: ContactService
    constructor(props: any) {
        super(props)
        this.contactService = new ContactService()
    }

    render() {
        return (
            <div className="container">
                <section>
                {this.state.contact &&
                    <>
                        <ContactCardStatic {...this.state.contact} />
                        <NoteList hideSearch={true} contact={this.state.contact} />
                    </>
                }
                </section>
            </div>
        )
    }
}