import React from 'react'
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMentionPlugin, { defaultSuggestionsFilter} from 'draft-js-mention-plugin'
import './TextInput.scss'
import 'draft-js-mention-plugin/lib/plugin.css';
import ContactService, { School } from '../../shared/school-service'

class TextInput extends React.Component {
    mentionPlugin: any
    readonly state: any = {
        editorState: EditorState.createEmpty(),
        suggestions: [] as School[]
    }
    contactService: ContactService
    constructor(props: any) {
        super(props)
        this.contactService = new ContactService()
        this.mentionPlugin = createMentionPlugin()
    }

    onChange = (editorState: EditorState) => {
        this.setState({ editorState })
    }

    onSearchChange = (e: {value:string}) => {
        console.log(e.value)
        
        this.contactService.retrieveSchools().then((results: School[]) => {
            this.setState({
                suggestions: defaultSuggestionsFilter<School>(e.value, results)
            })
        })
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
                <MentionSuggestions<School> onSearchChange={this.onSearchChange}
                    suggestions={this.state.suggestions} />
            </div>
        )
    }

}

export default TextInput