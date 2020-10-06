import { Card, CardMedia, Icon, CardContent, Paragraph } from '@amsterdam/asc-ui'
import { Student } from '@amsterdam/asc-assets'
import React from 'react'
import './card.scss'
import { Contact } from '../../shared/service_contact'

export const ContactCardStatic = (contact: Contact) => {
    return (
        <div className={'card'}>
            <Card horizontal>
                <CardMedia maxWidth={60} >
                    <Icon><Student /></Icon>
                </CardMedia>
                <CardContent>
                    <Paragraph><b>Naam:</b> {contact.name}</Paragraph>
                    <Paragraph><b>Telefoon:</b> {contact.phone}</Paragraph>
                    <Paragraph><b>Email:</b> {contact.email}</Paragraph>

                </CardContent>
            </Card>
        </div>
    )
}