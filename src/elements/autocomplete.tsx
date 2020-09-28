import { Input } from '@amsterdam/asc-ui'
import React from 'react'
import SchoolService, { School } from '../shared/school-service'
import './autocomplete.scss'
type SchoolState = {
    schools: School[],
    filteredSchools: School[],
    schoolinput: string,
    selected?: School | any,
    showOptions: Boolean,
}

export class Autocomplete extends React.Component<{id: string}> {
    readonly state: SchoolState = {
        schoolinput: "",
        schools: [],
        filteredSchools: [],
        showOptions: true,

    }
    schoolService: SchoolService
    filter: string = ""

    constructor(props: {id: string}) {
        super(props)
        
        this.schoolService = new SchoolService()
    }

    handleClick = (e: any) => {
       this.setState({selected: e, schoolinput: e.name, showOptions: false})
    }
    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({schoolinput: e.target.value, showOptions: true})
        this.filter = e.target.value.toLowerCase()
        if (this.filter !== "") {
            this.schoolService.searchSchools(this.filter).then((results: School[]) => {
                this.setState({ schools: results, filteredSchools: results })
            })
        } else {
            this.setState({ schools: [], filteredSchools: [] })
        }
    }

    render() {
        return (
            <>
                <Input id={this.props.id} placeholder="School..." value={this.state.schoolinput}onChange={(e) => {
                    this.handleSearchInput(e)
                }} />{ this.state.showOptions &&
                <div className="autocomplete-items">
                {this.state.filteredSchools.map((value: School) => (
                    <div key={value.id} onClick={() => this.handleClick(value)}>{value.name}</div>
                ))}
                </div>
                }
            </>
        )
    }
}