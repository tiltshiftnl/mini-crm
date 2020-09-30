import React from 'react'
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import './TextInput.scss'
import SearchService from '../../shared/search-service'


type MentionProps = {
    className: string
    children: any
}
class TextInput extends React.Component {
    mentionPlugin: any
    readonly state: any = {
        editorState: EditorState.createEmpty(),
        suggestions: [] as any[]
    }
    searchService: SearchService
    constructor(props: any) {
        super(props)
        this.searchService = new SearchService()
        this.mentionPlugin = createMentionPlugin({
            mentionTrigger: '@',
            keyBindingFn: (e: any) => console.log(e),
            mentionComponent: (mentionProps: MentionProps) => {
                console.log(mentionProps)
                const setHighlight = () => {
                    if((mentionProps as any).mention.type === "school"){
                        return "red"
                    }
                    if((mentionProps as any).mention.type === "contact"){
                        return "green"
                    }
                }
                const onClick = () => {
                    alert("You clicked me!")
                }
                return (
                    <span
                        className={mentionProps.className + " " + setHighlight()}
                        // eslint-disable-next-line no-alert
                        onClick={onClick}
                    >
                        {mentionProps.children}
                    </span>
                )
            }
        })
    }

    onChange = (editorState: EditorState) => {
        this.setState({ editorState })
    }

    onSearchChange = (e: { value: string }) => {
        this.searchService.searchAny(e.value).then((results: any[]) => {
            this.setState({
                suggestions: defaultSuggestionsFilter(e.value, results)
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
                <MentionSuggestions onSearchChange={this.onSearchChange} className={"hit"}
                    suggestions={this.state.suggestions} />
            </div>
        )
    }

}

export default TextInput