import { Card, CardMedia, Icon, CardContent, Paragraph, CardActions } from '@datapunt/asc-ui'
import { Building, ChevronRight } from '@datapunt/asc-assets'
import React from 'react'
import './card.scss'
import { School } from '../shared/school-service'

export const SchoolCard = (school: School) => {
    return (
        <div className={'contact-card'}>
            <Card horizontal>
                <CardMedia maxWidth={60} >
                    <Icon><Building /></Icon>
                </CardMedia>
                <CardContent>
                    <Paragraph><b>School:</b> {school.naam}</Paragraph>
                    <Paragraph><b>Adres:</b> {school.address}</Paragraph>
                    <Paragraph><b>Type:</b> {school.school_type}</Paragraph>
                    {school.lrkp_id &&
                        <Paragraph><b>LRKP:</b> {school.lrkp_id}</Paragraph>
                    }
                    {school.brin &&
                        <Paragraph><b>BRIN:</b> {school.brin}</Paragraph>
                    }
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