import { Button, TextArea } from '@datapunt/asc-ui'

import React from 'react'
import './Home.scss'
export class HomePage extends React.Component {
    render() {
        return (
            <section style={{ padding: "1em" }}>
                <TextArea rows={10} cols={2} placeholder="Begin direct met het maken van een notitie..."></TextArea>
                <React.Fragment>
                    <div className={"button-bar"}>
                        <Button variant="primary">Persoon</Button>
                        <Button variant="tertiary">Instantie</Button>
                        <Button variant="primaryInverted">Soort contact</Button>
                        <Button variant="secondary" taskflow>Opslaan</Button>
                    </div>
                </React.Fragment>
            </section>
        )
    }
}