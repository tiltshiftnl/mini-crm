import { Card, CardMedia, Icon, CardContent, Heading, Paragraph, CardActions } from '@datapunt/asc-ui'
import { PersonalLogin, ChevronRight } from '@datapunt/asc-assets'
import React from 'react'

export type ContactProps = {
    key: string,
    name: string,
    school: string
}

export const Contact = ({name, school}: ContactProps) => {
    return (
        <Card maxWidth={450} horizontal>
            <CardMedia maxWidth={100} backgroundColor="level2">
                <Icon size={25}>
                    <PersonalLogin />
                </Icon>
            </CardMedia>
            <CardContent>
                <Heading as="h6">{name}</Heading>
                <Paragraph>School: {school}</Paragraph>
            </CardContent>
            <CardActions>
                <Icon size={15}>
                    <ChevronRight />
                </Icon>
            </CardActions>
        </Card>
    )
}