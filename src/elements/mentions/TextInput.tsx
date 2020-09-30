import React from 'react'
import { convertToRaw, EditorState, RawDraftContentState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import './TextInput.scss'
import SearchService from '../../shared/search-service'

type MentionProps = {
    className: string
    children: any
}

type MentionEntity = {
    avatar: string, id: string, name: string, type: string
}

class TextInput extends React.Component {
    mentionPlugin: any
    hashtagPlugin: any
    readonly state: any = {
        editorState: EditorState.createEmpty(),
        suggestions: [] as any[],
        legend: ""
    }
    searchService: SearchService
    constructor(props: any) {
        super(props)
        this.searchService = new SearchService()
        this.hashtagPlugin = createHashtagPlugin()
        this.mentionPlugin = createMentionPlugin({
            mentionTrigger: '@',
            keyBindingFn: (e: any) => console.log(e),
            mentionComponent: (mentionProps: MentionProps) => {
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
        const data: RawDraftContentState = convertToRaw(editorState.getCurrentContent())
        // Extract text from the data
        const text: string = data.blocks[0].text
        // Extract Entities from data.entityMap
        const entities: MentionEntity[] = Object.keys(data.entityMap).map((key: string) => {
            return (data.entityMap[key].data.mention as any)
        })
        const filtered = text.split(' ').filter((word: string) => {
            return word.match(/\B(\#[a-zA-Z]+\b)(?!;)/)
        });
        this.setState({
            legend: filtered.length + " trefwoord(en), " + entities.length + " scholen/personen",
            editorState
        })
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
        const plugins = [this.mentionPlugin, this.hashtagPlugin]
        return (
            <>
            <div className={'editor'}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                />
                <MentionSuggestions onSearchChange={this.onSearchChange} className={"hit"}
                    suggestions={this.state.suggestions} />
            </div>
                <div className="legend">{this.state.legend}</div>
            </>
        )
    }

}

export default TextInput