import React from 'react'
import moment, { Moment } from 'moment';
import { convertToRaw, EditorState, Modifier, RawDraftContentState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import './TextInput.scss'
import SearchService from '../../shared/search-service'
import TermService, { Term } from '../../shared/term-service';
import { Button } from '@amsterdam/asc-ui';
import NoteService, { Note } from '../../shared/note-service'

type TextInputState = {
    editorState: EditorState
    note?: Note
    tags: Term[]
    suggestions: any[]
    legend: string
}
type MentionProps = {
    className: string
    children: any
}

type MentionEntity = {
    avatar: string
    id: number 
    key: string
    name: string
    type: string
}

class TextInput extends React.Component {
    start: Moment | undefined;
    mentionPlugin: any
    hashtagPlugin: any
    readonly state: TextInputState = {
        editorState: EditorState.createEmpty(),
        suggestions: [] as any[],
        tags: [],
        legend: "",
    }
    termService: TermService
    searchService: SearchService
    noteService: NoteService
    constructor(props: any) {
        super(props)
        this.searchService = new SearchService()
        this.termService = new TermService()
        this.noteService = new NoteService()
        this.termService.retrieveTags().then((result: Term[]) => {
            this.setState({ tags: result })
        })

        this.hashtagPlugin = createHashtagPlugin()
        this.mentionPlugin = createMentionPlugin({
            mentionTrigger: '@',
            supportWhitespace: true,
            keyBindingFn: (e: any) => console.log(e),
            mentionComponent: (mentionProps: MentionProps) => {
                const setHighlight = () => {
                    if ((mentionProps as any).mention.type === "school") {
                        return "red"
                    }
                    if ((mentionProps as any).mention.type === "contact") {
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
        const text: string = data.blocks[0].text
        const _note: Note = {
            id: 0,
            note: text
        }

        if (text.length > 0) {
            if (!this.start) {
                this.start = moment()
            }
        } else {
            this.start = undefined
        }
        // Extract Entities from data.entityMap
        const entities: MentionEntity[] = Object.keys(data.entityMap).map((key: string) => {
            return (data.entityMap[key].data.mention as any)
        })

        _note.tags = text.split(' ').filter((word: string) => {
            return word.match(/\B(#[a-zA-Z]+\b)(?!;)/)
        })

        _note.start = this.start?.toJSON()

        _note.contacts = entities.filter((i: any) => {return i.type === "contact"}).map((item: any)=> {
            return item.id
        })

        _note.schools = entities.filter((i: any) => {return i.type === "school"}).map((item: any)=> {
            return item.id
        })

        // If the time difference is larger then a minute, display it.
        const timePassed = moment().diff(this.start, "minutes") > 0 ? "~" + moment().diff(this.start, 'minutes') + "m" : ""
        const timeDisplay: string = this.start ?
            this.start.format("hh:mm") + timePassed
            : ""
        this.setState({
            legend: timeDisplay + " " + _note.tags.length + " trefwoord(en), " + _note.schools.length + " scholen " + _note.contacts.length + " personen",
            editorState,
            note: _note
        })
    }

    onSearchChange = (e: { value: string }) => {
        this.searchService.searchAny(e.value).then((results: any[]) => {
            this.setState({
                suggestions: defaultSuggestionsFilter(e.value, results)
            })
        })
    }

    insertText = (text: string, editorState: EditorState) => {
        const currentContent = editorState.getCurrentContent(),
            currentSelection = editorState.getSelection();

        const newContent = Modifier.replaceText(
            currentContent,
            currentSelection,
            text
        );

        const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
        return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
    }

    sendTextToEditor = (text: string) => {
        this.setState({ editorState: this.insertText(text, this.state.editorState) });
    }

    handleSubmit = (event: any) => {
        if(this.state.note){
            const postNote: Note = this.state.note
            this.noteService.postNote(postNote).then((result: Note) => {
                this.setState({ note: undefined })
            })
        }
        event.preventDefault()
    }

    render() {
        const { MentionSuggestions } = this.mentionPlugin
        const plugins = [this.mentionPlugin, this.hashtagPlugin]
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div className={'editor'}>
                        <Editor
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            plugins={plugins}
                        />
                        <MentionSuggestions onSearchChange={this.onSearchChange}
                            suggestions={this.state.suggestions} />
                    </div>
                    <div className="legend">{this.state.legend}</div>
                    <div className="tag-list">
                        {this.state.tags.map((value: Term) => (
                            <div className={`note-tag  size${value.notes}`}
                                onClick={this.sendTextToEditor.bind(this, " #" + value.tag + " ")}
                                key={value.id}>
                                {value.tag}
                            </div>
                        ))}
                    </div>
                    <React.Fragment>
                        <div className={"button-bar"}>
                            <Button variant="secondary" taskflow>Opslaan</Button>
                        </div>
                    </React.Fragment>
                </form>
            </>
        )
    }

}

export default TextInput