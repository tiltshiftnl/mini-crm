import { Button, SearchBar } from '@datapunt/asc-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { ContactCard } from '../elements/contact'
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

    componentDidMount() {
        // this.contactService.retrieveContacts().then(results => {
        //     results.map((contact: Contact) => {
        //         return contact
        //     })
        //     this.setState({ contacts: results, filteredContacts: results })
        // })
    }

    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let filteredContacts: Contact[] = this.state.contacts
        this.filter = e.target.value.toLowerCase()
        if (this.filter !== "") {
            filteredContacts = this.state.contacts.filter(
                contact => {
                    if (contact.naam.toLowerCase().includes(this.filter)) {
                        return true
                    }
                    if (contact.naam.toLowerCase().includes(this.filter)) {
                        return true
                    }
                    if (contact.school && contact.school!.naam.toLowerCase().includes(this.filter)) {
                        return true
                    }
                    return false
                }
            )
        }

        this.setState({
            filteredContacts: filteredContacts
        })
    }

    render() {
        return (
            <section style={{ padding: "1em" }}>
                {/* <FormTitle>
                    <span>Zoeken naar docent</span>
                </FormTitle> */}
                <SearchBar placeholder="Docent..." autoFocus onChange={(e) => {
                    this.handleSearchInput(e)
                }} />
                {this.state.filteredContacts.map((value: Contact) => (
                    <ContactCard key={value.id} {...value} />
                ))}
                <p></p>
                <Button variant="secondary" taskflow>
                    <Link className="button-link" to="/contacts/new">Nieuwe docent</Link>
                </Button>
            </section>
        )
    }
}