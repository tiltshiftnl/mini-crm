import { Card, CardMedia, Icon, CardContent, Paragraph, CardActions } from '@amsterdam/asc-ui'
import { Building, ChevronRight } from '@amsterdam/asc-assets'
import React from 'react'
import './card.scss'
import { School } from '../../shared/service_school'
import { Link } from 'react-router-dom'

export const SchoolCard = (school: School) => {
    return (
        <div className={'card'}>
            <Link to={{
                pathname: "/school/" + school.id,
                state: {
                    school: school
                }
            }}>
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