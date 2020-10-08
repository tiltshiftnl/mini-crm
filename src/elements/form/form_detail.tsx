import React, { RefObject } from 'react'
import { RouteProps } from 'react-router-dom'
import { NoteList } from '../list/list_note'
import './form.scss'

export class DetailForm extends React.Component<RouteProps> {
    id: number = 0
    router: any
    note_list_ref: RefObject<NoteList>

    public constructor(props: any) {
        super(props)
        this.note_list_ref = React.createRef()
    }


    refresh() {}

    componentDidUpdate(prevProps: RouteProps) {
        if(this.props.location && prevProps.location && prevProps.location.pathname !== this.props.location.pathname) {
            this.refresh()
        }
    }

    componentDidMount() {
        this.refresh()
    }

    render() {return <div></div>}
}