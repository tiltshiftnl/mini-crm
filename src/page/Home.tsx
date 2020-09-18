import { FormTitle, SearchBar } from '@datapunt/asc-ui'
import React from 'react'
import { Contact } from '../elements/contact'
import PersonService, { Person } from '../shared/mock-person-service'

type HomeState = {
    contacts: Person[],
    filteredContacts: Person[]
}
export class Home extends React.Component {
    readonly state: HomeState = {
        contacts: [],
        filteredContacts: []
    }

    personService: PersonService
    filter: string = ""

    constructor(props: any) {
        super(props)
        this.personService = new PersonService()
    }

    componentDidMount() {
        this.personService.retrievePeople().then(results => {
            this.setState({contacts: results, filteredContacts: results})
          }
        )
    }

    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let filteredContacts: Person[] = this.state.contacts
        this.filter = e.target.value
        if (this.filter !== "") {
            filteredContacts = this.state.contacts.filter(contact => contact.name.first.includes(this.filter))
        }

        this.setState({
            filteredContacts: filteredContacts
        })
    }

    render() {
        return (
            <section style={{ padding: "1em" }}>
                <FormTitle>
                    <span>Zoeken naar docent of school</span>
                </FormTitle>
                <SearchBar placeholder="Bijv. KvK, Naam of Schoolnaam" autoFocus onChange={(e) => {
                    this.handleSearchInput(e)
                }} />
                {this.state.filteredContacts.map((value: Person) => (
                    <Contact {...value} />
                ))}
            </section>
        )
    }
}