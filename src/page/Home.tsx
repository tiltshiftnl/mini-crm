import { Button } from '@amsterdam/asc-ui'

import React from 'react'
import TextInput from '../elements/mentions/TextInput'
import TermService, { Term } from '../shared/term-service'
import './Home.scss'

type HomeState = {
    tags: Term[]
}
export class HomePage extends React.Component {
    readonly state: HomeState = {
        tags: []
    }
    termService: TermService

    constructor(props: any) {
        super(props)
        this.termService = new TermService()
        this.termService.retrieveTags().then((result: Term[])=> {
            this.setState({tags: result})
        })
    }

    render() {
        return (
            <section style={{ padding: "1em" }}>
                <TextInput />
                {this.state.tags.map((value: Term) => (
                    <div className={`tag  size${value.notes}`} key={value.id}>{value.tag}</div>
                ))}
                <React.Fragment>
                    <div className={"button-bar"}>
                        <Button variant="secondary" taskflow>Opslaan</Button>
                    </div>
                </React.Fragment>
            </section>
        )
    }
}