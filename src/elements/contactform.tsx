import { Card, CardContent, FormTitle, Label, Input, Button } from '@datapunt/asc-ui'
import React from 'react'
import { Autocomplete } from './autocomplete'
import './card.scss'

export class ContactForm extends React.Component<{}> {
    school: any
    constructor(props: {}){
        super(props)
        this.school = React.createRef()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSubmit = (event: any) => {
        console.log(this.state)
        console.log(this.school.current.state.selected)
        event.preventDefault()
    }

    handleInputChange(event: any) {
        const target = event.target
        const value = target.value
        const id = target.id
        this.setState({
          [id]: value
        })
    }

    render() {
        return (
        <div className={'contact-card'}>
            <form onSubmit={this.handleSubmit}>
                <FormTitle>Nieuwe docent aanmaken</FormTitle>
                <Card horizontal>
                    <CardContent>
                        <Label htmlFor="name" label="Naam:" />
                        <Input id="name" onChange={this.handleInputChange}/>
                        <Label htmlFor="phone" label="Telefoonnummer:" />
                        <Input id="phone" onChange={this.handleInputChange}/>
                        <Label htmlFor="email" label="Emailadres:" />
                        <Input id="email" onChange={this.handleInputChange}/>
                        <Label htmlFor="school" label="School:" />
                        <Autocomplete id="school" ref={this.school}/>
                        <p/>
                        <Button variant="secondary" taskflow>Aanmaken</Button>
                    </CardContent>
                </Card>
            </form>
        </div>
        )
    }
}