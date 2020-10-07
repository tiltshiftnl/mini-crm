import { Card, CardMedia, Icon, CardContent, Paragraph, CardActions } from '@amsterdam/asc-ui'
import { ChevronRight, Student } from '@amsterdam/asc-assets'
import React from 'react'
import './card.scss'
import { Contact } from '../../shared/service_contact'
import { Link } from 'react-router-dom'
export const ContactCard = (contact: Contact) => {
    return (
        <div className={'card'}>
            <Link to={{
                pathname: "/contact/" + contact.id,
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
                        {contact.phone &&
                            <Paragraph><b>Telefoon:</b> {contact.phone}</Paragraph>
                        }
                        {contact.email &&
                            <Paragraph><b>Email:</b> {contact.email}</Paragraph>
                        }

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