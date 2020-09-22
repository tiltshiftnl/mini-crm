import { Input } from '@datapunt/asc-ui'
import React from 'react'
import SchoolService, { School } from '../shared/school-service'
import './autocomplete.scss'
type SchoolState = {
    schools: School[],
    filteredSchools: School[],
    selected?: School,
    showOptions: Boolean
}
export class Autocomplete extends React.Component<{id: string}> {
    readonly state: SchoolState = {
        schools: [],
        filteredSchools: [],
        showOptions: true
    }
    schoolService: SchoolService
    filter: string = ""

    constructor(props: {id: string}) {
        super(props)
        
        this.schoolService = new SchoolService()
    }

    handleClick = (e: any) => {
       this.setState({selected: e, showOptions: false})
    }
    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({selected: e.target.value, showOptions: true})
        this.filter = e.target.value.toLowerCase()
        if (this.filter !== "" && this.filter.length > 4) {
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
                <Input id={this.props.id} placeholder="School..." value={this.state.selected ? this.state.selected.naam : ""}onChange={(e) => {
                    this.handleSearchInput(e)
                }} />{ this.state.showOptions &&
                <div className="autocomplete-items">
                {this.state.filteredSchools.map((value: School) => (
                    <div onClick={() => this.handleClick(value)}>{value.naam}</div>
                ))}
                </div>
                }
            </>
        )
    }
}