import { Card, CardMedia, Icon, CardContent, Paragraph, CardActions, Image } from '@datapunt/asc-ui'
import { ChevronRight } from '@datapunt/asc-assets'
import React from 'react'
import { Person } from '../shared/mock-person-service'
import { Chance } from 'chance'

export const Contact = (person: Person) => {
    const chance = new Chance()
    return (
        <Card horizontal>
            <CardMedia maxWidth={60}>
                <Image src={person.picture.thumbnail}/>
            </CardMedia>
            <CardContent>
                <Paragraph><b>Naam:</b> {person.name.title} {person.name.first} {person.name.last}</Paragraph>
                <Paragraph><b>School:</b> {chance.company()}</Paragraph>
                <Paragraph><b>Telefoon:</b> {person.phone}</Paragraph>
            </CardContent>
            <CardActions>
                <Icon size={15}>
                    <ChevronRight />
                </Icon>
            </CardActions>
        </Card>
    )
}