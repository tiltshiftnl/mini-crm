import { FormTitle, SearchBar } from '@datapunt/asc-ui'
import React from 'react'
import { Contact, ContactProps } from '../elements/contact'
import { Chance } from 'chance'

export type HomeProps = {
    key: number
}

export class Home extends React.Component {
    readonly state = {
        contacts: []
    }
    elements: ContactProps[] = []
    filter: string = ""
    constructor(props: HomeProps) {
        super(props)
        const chance = new Chance()
        var times = 10;
        for(var i=0; i < times; i++){
            this.elements.push({
                key: chance.guid(),
                name: chance.name(),
                school: chance.company()
            })
        }
    }

    componentDidMount(){
        this.setState({contacts: this.elements})
    }
  
    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let filteredContacts: ContactProps[] = this.elements
        this.filter = e.target.value
        if (this.filter !== "") {
            filteredContacts = this.elements.filter(contact => contact.name.includes(this.filter))
        }
  
        this.setState({
            contacts: filteredContacts
        })
    }
    
    render() {
        return (
            <section style={{ padding: "1em" }}>
        <FormTitle>Zoeken naar docent of school</FormTitle>
        <SearchBar placeholder="Bijv. KvK, Naam of Schoolnaam" autoFocus onChange={(e) => {
          this.handleSearchInput(e)
        }} />
        {this.state.contacts.map((value: ContactProps) => (
            <Contact key={value.key} name={value.name} school={value.school} />
        ))}
      </section>
        )
    }
}