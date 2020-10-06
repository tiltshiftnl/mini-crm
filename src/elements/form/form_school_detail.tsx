import React from 'react'
import { RouteProps } from 'react-router-dom'
import SchoolService, { School } from '../../shared/service_school'
import { SchoolCardStatic } from '../card/card_school_static'
import { NoteList } from '../list/list_note'
import './form.scss'

type SchoolDetailFormState = {
    school?: School,
}

export class SchoolDetailForm extends React.Component<RouteProps> {
    id: number = 0
    router: any

    readonly state: SchoolDetailFormState = {
        school: undefined
    }

    service: SchoolService


    constructor(props: any) {
        super(props)
        this.service = new SchoolService()
    }


    componentDidMount() {
        console.log(this.props.location)
        if (this.props.location && this.props.location.state && (this.props.location?.state as any).contact) {
            this.setState({
                school: (this.props.location?.state as any).school
            })
        } else {
            this.id = (this.props as any).match.params.id
            this.service.retrieveSchool(this.id).then(result => {
                console.log(result)
                this.setState({
                    school: result
                })
            })
        }
    }

    render() {
        return (
            <div className="container">
                <section>
                    {this.state.school &&
                        <>
                            <SchoolCardStatic {...this.state.school} />
                            <NoteList hideSearch={true} school={this.state.school} />
                        </>
                    }
                </section>
            </div>
        )
    }
}