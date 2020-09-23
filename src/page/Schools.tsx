import { SearchBar } from '@datapunt/asc-ui'
import React from 'react'
import { SchoolCard } from '../elements/school'
import SchoolService, { School } from '../shared/school-service'

type SchoolState = {
    schools: School[],
    filteredSchools: School[]
}
export class SchoolPage extends React.Component {
    readonly state: SchoolState = {
        schools: [],
        filteredSchools: []
    }
    schoolService: SchoolService
    filter: string = ""

    constructor(props: any) {
        super(props)
        this.schoolService = new SchoolService()
    }

    handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <section style={{ padding: "1em" }}>
                {/* <FormTitle>
                    <span>Zoeken naar school</span>
                </FormTitle> */}
                <SearchBar placeholder="School..." autoFocus onChange={(e) => {
                    this.handleSearchInput(e)
                }} />
                {this.state.filteredSchools.map((value: School) => (
                    <SchoolCard key={value.id} {...value} />
                ))}
            </section>
        )
    }
}