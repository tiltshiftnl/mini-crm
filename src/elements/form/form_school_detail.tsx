import React from 'react'
import SchoolService, { School } from '../../shared/service_school'
import { SchoolCardStatic } from '../card/card_school_static'
import { NoteList } from '../list/list_note'
import { DetailForm } from './form_detail'

type SchoolDetailFormState = {
    school?: School,
}

export class SchoolDetailForm extends DetailForm {
    readonly state: SchoolDetailFormState = {
        school: undefined
    }

    service: SchoolService

    constructor(props: any) {
        super(props)
        this.service = new SchoolService()
    }


    refresh() {
        if (this.props.location && this.props.location.state && (this.props.location?.state as any).contact) {
            const _school = (this.props.location?.state as any).school
            this.setState({
                school: _school
            })
            if (this.note_list_ref.current) {
                this.note_list_ref.current.setState({
                    school: _school
                })
            }
        } else {
            this.id = (this.props as any).match.params.id
            this.service.retrieveSchool(this.id).then(result => {
                this.setState({
                    school: result
                })
                if (this.note_list_ref.current) {
                    this.note_list_ref.current.setState({
                        school: result
                    })
                }
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