import { FormTitle, SearchBar } from '@datapunt/asc-ui'
import React from 'react'
import { ContactCard } from '../elements/contact'
import { SchoolCard } from '../elements/school'
import PersonService, { Person } from '../shared/person-service'
import SchoolService, { School } from '../shared/school-service'

type HomeState = {
    contacts: Person[],
    filteredContacts: Person[],
    schools: School[],
    filteredSchools: School[]
}
export class Home extends React.Component {
    readonly state: HomeState = {
        contacts: [],
        filteredContacts: [],
        schools: [],
        filteredSchools: []
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
            this.setState({ schools: results, filteredSchools: results })
            this.personService.retrievePeople().then(results => {
                results.map((person: Person) => {
                    person.school = tempschools[Math.floor(Math.random() * tempschools.length)]
                    return person
                })
                this.setState({ contacts: results, filteredContacts: results })
            })
        })
    }

    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let filteredContacts: Person[] = this.state.contacts
        let filteredSchools: School[] = this.state.schools
        this.filter = e.target.value.toLowerCase()
        if (this.filter !== "") {
            filteredContacts = this.state.contacts.filter(
                contact => {
                    if (contact.name.first.toLowerCase().includes(this.filter)) {
                        return true
                    }
                    if (contact.name.last.toLowerCase().includes(this.filter)) {
                        return true
                    }
                    if (contact.school && contact.school!.naam.toLowerCase().includes(this.filter)) {
                        return true
                    }
                    return false
                }
            )
            filteredSchools = this.state.schools.filter(
                school => {
                    if (school.naam.toLowerCase().includes(this.filter)) {
                        return true
                    }
                    return false
                }
            )
        }

        this.setState({
            filteredContacts: filteredContacts,
            filteredSchools: filteredSchools
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
                    <ContactCard key={value.login.uuid} {...value} />
                ))}
                {this.state.filteredSchools.map((value: School) => (
                    <SchoolCard key={value.id} {...value} />
                ))}
            </section>
        )
    }
}