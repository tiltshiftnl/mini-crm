import { Button, SearchBar } from '@datapunt/asc-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { ContactCard } from '../elements/contactcard'
import ContactService, { Contact } from '../shared/contact-service'
import './Contacts.scss'
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

    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.filter = e.target.value.toLowerCase()
        if (this.filter !== "") {
            this.contactService.searchContacts(this.filter).then((results: Contact[]) => {
                this.setState({ contacts: results, filteredContacts: results })
            })
        } else {
            this.setState({ contacts: [], filteredContacts: [] })
        }
    }

    render() {
        return (
            <section style={{ padding: "1em" }}>
                <SearchBar placeholder="Contact..." autoFocus onChange={(e) => {
                    this.handleSearchInput(e)
                }} />
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