import React from 'react'
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMentionPlugin, { defaultSuggestionsFilter} from 'draft-js-mention-plugin'
import './TextInput.scss'
import 'draft-js-mention-plugin/lib/plugin.css';
import ContactService, { Contact } from '../../shared/contact-service'
//import SchoolService, { School } from '../../shared/school-service'

class TextInput extends React.Component {
    //schoolMentionPlugin: any
    mentionPlugin: any
    readonly state: any = {
        editorState: EditorState.createEmpty(),
        suggestions: [],
        //schoolSuggestions: []
    }
    contactService: ContactService
    //schoolService: SchoolService
    constructor(props: any) {
        super(props)
        this.contactService = new ContactService()
        //this.schoolService = new SchoolService()
        //this.schoolMentionPlugin = createMentionPlugin({mentionTrigger: ":"})
        this.mentionPlugin = createMentionPlugin()
    }

    onChange = (editorState: EditorState) => {
        this.setState({ editorState })
    }

    onSearchChange = (e: {value:string}) => {
        console.log(e.value)
        
        this.contactService.retrieveContacts().then((results: Contact[]) => {
            this.setState({
                suggestions: defaultSuggestionsFilter(e.value, results)
            })
        })
    }

    // onSchoolSearchChange = (e: {value:string}) => {
    //     this.schoolService.retrieveSchools().then((results: School[]) => {
    //         this.setState({
    //             schoolSuggestions: defaultSuggestionsFilter(e.value, results)
    //         })
    //     })
    // }

    render() {
        const { MentionSuggestions } = this.mentionPlugin
        //const { SchoolMentionSuggestions } = this.schoolMentionPlugin
        const plugins = [this.mentionPlugin]//, this.schoolMentionPlugin]
        return (
            <div className={'editor'}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                />
                <MentionSuggestions onSearchChange={this.onSearchChange}
                    suggestions={this.state.suggestions} />
                {/* <SchoolMentionSuggestions onSearchChange={this.onSchoolSearchChange}
                    suggestions={this.state.schoolSuggestions} /> */}
            </div>
        )
    }

}

export default TextInput