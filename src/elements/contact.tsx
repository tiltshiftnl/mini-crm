import { Card, CardMedia, Icon, CardContent, Paragraph, CardActions } from '@datapunt/asc-ui'
import { ChevronRight, Student } from '@datapunt/asc-assets'
import React from 'react'
import { Person } from '../shared/person-service'
import './card.scss'
export const ContactCard = (person: Person) => {
    return (
        <div className={'contact-card'}>
            <Card horizontal>
                <CardMedia maxWidth={60} >
                    <Icon><Student /></Icon>
                    {/* <Image src={person.picture.thumbnail}/> */}
                </CardMedia>
                <CardContent>
                    <Paragraph><b>Naam:</b> {person.name.first} {person.name.last}</Paragraph>
                    {person.school &&
                        <Paragraph><b>School:</b> {person.school.naam}</Paragraph>
                    }

                    <Paragraph><b>Telefoon:</b> {person.phone}</Paragraph>
                </CardContent>
                <CardActions>
                    <Icon size={15}>
                        <ChevronRight />
                    </Icon>
                </CardActions>
            </Card>
        </div>
    )
}