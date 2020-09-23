import { Card, CardMedia, Icon, CardContent, Paragraph } from '@datapunt/asc-ui'
import { Student } from '@datapunt/asc-assets'
import React from 'react'
import './card.scss'
import { Contact } from '../shared/contact-service'

export const ContactCardStatic = (contact: Contact) => {
    return (
        <div className={'contact-card'}>
            <Card horizontal>
                <CardMedia maxWidth={60} >
                    <Icon><Student /></Icon>
                </CardMedia>
                <CardContent>
                    <Paragraph><b>Naam:</b> {contact.name}</Paragraph>
                    {contact.school &&
                        <Paragraph><b>School:</b> {contact.school.name}</Paragraph>
                    }

                    <Paragraph><b>Telefoon:</b> {contact.phone}</Paragraph>
                    <Paragraph><b>Email:</b> {contact.email}</Paragraph>

                </CardContent>
            </Card>
        </div>
    )
}