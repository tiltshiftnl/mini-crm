import React from 'react'
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMentionPlugin from 'draft-js-mention-plugin'
import './TextInput.scss'
import { mentions } from './mentions'
import 'draft-js-mention-plugin/lib/plugin.css';
import SchoolService from '../../shared/school-service'

class TextInput extends React.Component {
    mentionPlugin: any
    readonly state: any = {
        editorState: EditorState.createEmpty(),
        suggestions: mentions
    }
    schoolService: SchoolService

    constructor(props: any) {
        super(props)
        this.schoolService = new SchoolService()
        this.mentionPlugin = createMentionPlugin({mentions})
    }

    onChange = (editorState: EditorState) => {
        this.setState({ editorState })
    }

    onSearchChange = (e: {value:string}) => {
        console.log(e.value)
        // this.schoolService.searchSchools(e.value).then((results: School[]) => {
        //      this.setState({ suggestions: results })
        // })
    }

    render() {
        const { MentionSuggestions } = this.mentionPlugin
        const plugins = [this.mentionPlugin]
        return (
            <div className={'editor'}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                />
                <MentionSuggestions onSearchChange={this.onSearchChange}
                    suggestions={this.state.suggestions} />
            </div>
        )
    }

}

export default TextInput