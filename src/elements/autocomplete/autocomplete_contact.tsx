import { Input } from '@amsterdam/asc-ui'
import React from 'react'
import ContactService, { Contact } from '../../shared/service_contact'
import { AutoCompleteState } from './autocomplete'
import './autocomplete.scss'


export class Autocomplete extends React.Component<{ id: string, onSelect: Function }> {
    readonly state: AutoCompleteState<Contact> = {
        input: "",
        items: [],
        filtered: [],
        showOptions: true,
    }
    service: ContactService
    filter: string = ""

    constructor(props: { id: string, onSelect: Function }) {
        super(props)

        this.service = new ContactService()
    }

    setValue = (value: string) => {
        this.setState({
            input: value,
            items: [],
            filtered: [],
            showOptions: false
        })
    }

    getValue = () => {
        return this.state.input
    }

    handleClick = (e: Contact) => {
        this.setState({ selected: e, input: e.name, showOptions: false })
        this.props.onSelect(e)
    }
    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onSelect(undefined)
        this.setState({ input: e.target.value, showOptions: true })
        this.filter = e.target.value.toLowerCase()
        if (this.filter !== "") {
            this.service.searchContact(this.filter).then((results: Contact[]) => {
                this.setState({ items: results, filtered: results })
            })
        } else {
            this.setState({ items: [], filtered: [] })
        }
    }

    render() {
        return (
            <div className="dropdown">
                <Input id={this.props.id} placeholder="Naam..." value={this.state.input} onChange={(e) => {
                    this.handleSearchInput(e)
                }} />{this.state.showOptions &&
                    <div className="autocomplete-items">
                        {this.state.filtered.map((value: Contact) => (
                            <div key={value.id} onClick={() => this.handleClick(value)}>{value.name}</div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}