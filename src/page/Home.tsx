import { FormTitle, SearchBar } from '@datapunt/asc-ui'
import React from 'react'
import { Contact } from '../elements/contact'
import PersonService, { Person } from '../shared/person-service'
import SchoolService, { School } from '../shared/school-service'

type HomeState = {
    contacts: Person[],
    filteredContacts: Person[],
    schools: School[]
}
export class Home extends React.Component {
    readonly state: HomeState = {
        contacts: [],
        filteredContacts: [],
        schools: []
    }
    schoolService: SchoolService
    personService: PersonService
    filter: string = ""

    constructor(props: any) {
        super(props)
        this.schoolService = new SchoolService()
        this.personService = new PersonService()
    }

    componentDidMount() {
        this.schoolService.retrieveSchools().then((results: School[]) => {
            const tempschools = results
            this.setState({schools: results})
            this.personService.retrievePeople().then(results => {
                results.map((person: Person) => {
                    person.school = tempschools[Math.floor(Math.random() * tempschools.length)]
                    return person
                })
                this.setState({contacts: results, filteredContacts: results})
              }
            )
          }
        )
        
    }

    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let filteredContacts: Person[] = this.state.contacts
        this.filter = e.target.value.toLowerCase()
        if (this.filter !== "") {
            filteredContacts = this.state.contacts.filter(
                contact => {
                    return contact.name.first.toLowerCase().includes(this.filter) ||
                    contact.name.last.toLowerCase().includes(this.filter) ||
                    contact.school ? contact.school!.naam.toLowerCase().includes(this.filter) : false
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
                <FormTitle>
                    <span>Zoeken naar docent of school</span>
                </FormTitle>
                <SearchBar placeholder="Bijv. KvK, Naam of Schoolnaam" autoFocus onChange={(e) => {
                    this.handleSearchInput(e)
                }} />
                {this.state.filteredContacts.map((value: Person) => (
                    <Contact key={value.login.uuid} {...value} />
                ))}
            </section>
        )
    }
}