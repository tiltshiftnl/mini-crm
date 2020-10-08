import { Card, CardMedia, Icon, CardContent, Paragraph, Link } from '@amsterdam/asc-ui'
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
                    {school.website &&
                        <Paragraph><b>School:</b> <Link icon="external" href={school.website}>{school.name}</Link></Paragraph>
                    }
                    {!school.website &&
                        <Paragraph><b>School:</b> {school.name}</Paragraph>
                    }
                    
                    <Paragraph>
                        <b>Adres:</b> {school.address}
                        {school.postcode &&
                        <span>  {school.postcode}</span>
                        }
                        
                        {school.city &&
                        <span>, {school.city}</span>
                        }
                        {school.suburb &&
                        <span> ({school.suburb})</span>
                        }
                    </Paragraph>
                    {school.email &&
                        <Paragraph><b>Email:</b> <Link href={`mailto://${school.email}`}>{school.email}</Link></Paragraph>
                    }
                    {school.phone &&
                        <Paragraph><b>Telefoon:</b> {school.phone}</Paragraph>
                    }
                    <Paragraph><b>Type:</b> {school.school_type}</Paragraph>
                    {school.lrkp_id &&
                        <Paragraph><b>LRKP:</b> {school.lrkp_id}</Paragraph>
                    }
                    {school.brin &&
                        <Paragraph><b>BRIN:</b> {school.brin}</Paragraph>
                    }
                    {school.vestigingsnummer && school.vestigingsnummer !== "0" &&
                        <Paragraph><b>Vestigingsnummer:</b> {school.vestigingsnummer}</Paragraph>
                    }
                    {school.schoolwijzer_url &&
                        <Paragraph><Link icon="external" href={school.schoolwijzer_url}>Schoolwijzer</Link></Paragraph>
                    }
                    {school.grondslag &&
                        <Paragraph><b>Grondslag:</b> {school.grondslag}</Paragraph>
                    }
                    {school.heeft_voorschool &&
                        <Paragraph><b>Voorschoolse opvang:</b> Ja</Paragraph>
                    }
                    {school.leerlingen && (school.leerlingen > 0) &&
                        <Paragraph><b>Aantal leerlingen:</b> {school.leerlingen}</Paragraph>
                    }
                </CardContent>
            </Card>
        </div>
    )
}