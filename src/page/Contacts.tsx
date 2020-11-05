import { Button, SearchBar } from '@amsterdam/asc-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { ContactCard } from '../elements/card/card_contact'
import ContactService, { Contact } from '../shared/service_contact'
import './page.scss'
type ContactState = {
    contacts: Contact[],
    filteredContacts: Contact[],
}
export class ContactPage extends React.Component {
    readonly state: ContactState = {
        contacts: [],
        filteredContacts: [],
    }
    contactService: ContactService
    filter: string = ""

    constructor(props: any) {
        super(props)
        this.contactService = new ContactService()
    }

    retrieveContacts = () => {
        if (this.filter !== "") {
            this.contactService.search(this.filter).then((results: Contact[]) => {
                this.setState({ contacts: results, filteredContacts: results })
            })
        } else {
            this.setState({ contacts: [], filteredContacts: [] })
        }
    }

    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.filter = e.target.value.toLowerCase()
        this.retrieveContacts()
    }

    render() {
        return (
            <section style={{ padding: "1em" }}>
                <SearchBar className="disable-button" placeholder="Contact..." autoFocus onChange={(e) => {
                    this.handleSearchInput(e)
                }} onClear={() => {
                    this.filter = ""
                    this.retrieveContacts()
                }}/>
                {this.state.filteredContacts.map((value: Contact) => (
                    <ContactCard key={value.id} {...value} />
                ))}
                <p></p>
                <Button variant="secondary" taskflow>
                    <Link className="button-link" to="/contacts/new">Nieuw contact</Link>
                </Button>
            </section>
        )
    }
}