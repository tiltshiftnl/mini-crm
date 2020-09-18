import { Card, CardMedia, Icon, CardContent, Paragraph, CardActions, Image } from '@datapunt/asc-ui'
import { ChevronRight } from '@datapunt/asc-assets'
import React from 'react'
import { Person } from '../shared/person-service'

export const Contact = (person: Person) => {
    return (
        <Card horizontal>
            <CardMedia maxWidth={60}>
                <Image src={person.picture.thumbnail}/>
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
    )
}