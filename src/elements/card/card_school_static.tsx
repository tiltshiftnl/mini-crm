import { Card, CardMedia, Icon, CardContent, Paragraph } from '@amsterdam/asc-ui'
import { Building } from '@amsterdam/asc-assets'
import React from 'react'
import './card.scss'
import { School } from '../../shared/service_school'

export const SchoolCardStatic = (school: School) => {
    return (
        <div className={'card'}>
            <Card horizontal>
                <CardMedia maxWidth={60} >
                    <Icon><Building /></Icon>
                </CardMedia>
                <CardContent>
                    <Paragraph><b>School:</b> {school.name}</Paragraph>
                    <Paragraph><b>Adres:</b> {school.address}</Paragraph>
                    <Paragraph><b>Type:</b> {school.school_type}</Paragraph>
                    {school.lrkp_id &&
                        <Paragraph><b>LRKP:</b> {school.lrkp_id}</Paragraph>
                    }
                    {school.brin &&
                        <Paragraph><b>BRIN:</b> {school.brin}</Paragraph>
                    }
                </CardContent>
            </Card>
        </div>
    )
}