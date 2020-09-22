import { FormTitle } from '@datapunt/asc-ui'
import React from 'react'

export class HomePage extends React.Component {
    render() {
        return (
            <section style={{ padding: "1em" }}>
                <FormTitle>
                    <span>Welkom, kies een functie uit het menu</span>
                </FormTitle>
            </section>
        )
    }
}