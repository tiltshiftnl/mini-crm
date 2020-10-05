import { Input } from '@amsterdam/asc-ui'
import React from 'react'
import SchoolService, { School } from '../shared/school-service'
import { AutoCompleteState } from './autocomplete'
import './autocomplete.scss'


export class Autocomplete extends React.Component<{ id: string }> {
    readonly state: AutoCompleteState<School> = {
        input: "",
        items: [],
        filtered: [],
        showOptions: true,

    }
    service: SchoolService
    filter: string = ""

    constructor(props: { id: string }) {
        super(props)

        this.service = new SchoolService()
    }

    handleClick = (e: any) => {
        this.setState({ selected: e, input: e.name, showOptions: false })
    }
    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ input: e.target.value, showOptions: true })
        this.filter = e.target.value.toLowerCase()
        if (this.filter !== "") {
            this.service.search(this.filter).then((results: School[]) => {
                this.setState({ items: results, filtered: results })
            })
        } else {
            this.setState({ items: [], filtered: [] })
        }
    }

    render() {
        return (
            <>
                <Input id={this.props.id} placeholder="School..." value={this.state.input} onChange={(e) => {
                    this.handleSearchInput(e)
                }} />{this.state.showOptions &&
                    <div className="autocomplete-items">
                        {this.state.filtered.map((value: School) => (
                            <div key={value.id} onClick={() => this.handleClick(value)}>{value.name}</div>
                        ))}
                    </div>
                }
            </>
        )
    }
}