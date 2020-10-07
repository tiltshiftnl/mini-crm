import React from 'react'
import { RouteProps } from 'react-router-dom'
import ContactService, { Contact } from '../../shared/service_contact'
import { ContactCardStatic } from '../card/card_contact_static'
import { NoteList } from '../list/list_note'
import './form.scss'

type ContactDetailFormState = {
    contact?: Contact,
}

export class ContactDetailForm extends React.Component<RouteProps> {
    id: number = 0
    router: any

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
            this.setState({
                contact: (this.props.location?.state as any).contact
            })

        } else {
            this.id = (this.props as any).match.params.id
            this.service.retrieveContact(this.id).then(result => {
                this.setState({
                    contact: result
                })
            })
        }
    }

    componentDidUpdate(prevProps: RouteProps) {
        if(this.props.location && prevProps.location && prevProps.location.pathname !== this.props.location.pathname) {
            this.refresh()
        }
    }

    componentDidMount() {
        this.refresh()
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