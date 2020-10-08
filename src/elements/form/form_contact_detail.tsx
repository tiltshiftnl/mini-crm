import React from 'react'
import ContactService, { Contact } from '../../shared/service_contact'
import { ContactCardStatic } from '../card/card_contact_static'
import { NoteList } from '../list/list_note'
import { DetailForm } from './form_detail'

type ContactDetailFormState = {
    contact?: Contact,
}

export class ContactDetailForm extends DetailForm {
    readonly state: ContactDetailFormState = {
        contact: undefined
    }

    service: ContactService

    constructor(props: any) {
        super(props)
        this.service = new ContactService()
    }

    refresh() {
        if (this.props.location && this.props.location.state && (this.props.location?.state as any).contact) {
            const _contact = (this.props.location?.state as any).contact
            this.setState({
                contact: _contact
            })
            if (this.note_list_ref.current) {
                this.note_list_ref.current.setState({
                    contact: _contact
                })
            }

        } else {
            this.id = (this.props as any).match.params.id
            this.service.retrieveContact(this.id).then(result => {
                this.setState({
                    contact: result
                })
                if (this.note_list_ref.current) {
                    this.note_list_ref.current.setState({
                        contact: result
                    })
                }
            })
        }

    }

    render() {
        return (
            <div className="container">
                <section>
                    {this.state.contact &&
                        <>
                            <ContactCardStatic {...this.state.contact} />
                            <NoteList hideSearch={true} contact={this.state.contact} ref={this.note_list_ref} />
                        </>
                    }
                </section>
            </div>
        )
    }
}