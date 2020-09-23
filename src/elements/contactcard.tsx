import { Card, CardMedia, Icon, CardContent, Paragraph, CardActions } from '@datapunt/asc-ui'
import { ChevronRight, Student } from '@datapunt/asc-assets'
import React from 'react'
import './card.scss'
import { Contact } from '../shared/contact-service'
import { Link } from 'react-router-dom'
export const ContactCard = (contact: Contact) => {
    return (
        <div className={'contact-card'}>
            <Link to={{
                pathname: "/contact/" + contact.id + "/details",
                state: {
                    contact: contact
                }
            }}>
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
                    <CardActions>

                        <Icon size={15}>
                            <ChevronRight />
                        </Icon>

                    </CardActions>
                </Card>
            </Link>
        </div>
    )
}