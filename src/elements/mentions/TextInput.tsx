import React from 'react'
import moment, { Moment } from 'moment';
import { ContentState, convertToRaw, EditorState, Modifier, RawDraftContentState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import './TextInput.scss'
import SearchService from '../../shared/search-service'
import TermService, { Term } from '../../shared/term-service';
import { Button, FormTitle } from '@amsterdam/asc-ui';
import NoteService, { Note } from '../../shared/note-service'
import { extractHashtagsWithIndices } from '../../utils';
import { Autocomplete } from '../autocompleteContact';
import ContactService, { Contact } from '../../shared/contact-service';
import { AutocompleteContactByPhone } from '../autocompleteContactByPhone';

type TextInputProps = {
    afterSubmit: Function
}

type TextInputState = {
    editorState: EditorState
    note?: Note
    tags: Term[]
    suggestions: any[]
    legend: string
    contact?: Contact
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

class TextInput extends React.Component<TextInputProps> {
    start: Moment | undefined;
    contact_name_ref: React.RefObject<Autocomplete>
    contact_phone_ref: React.RefObject<AutocompleteContactByPhone>
    mentionPlugin: any
    hashtagPlugin: any
    readonly state: TextInputState = {
        editorState: EditorState.createEmpty(),
        suggestions: [] as any[],
        tags: [],
        legend: ""
    }
    termService: TermService
    searchService: SearchService
    noteService: NoteService
    constructor(props: TextInputProps) {
        super(props)
        this.contact_name_ref = React.createRef()
        this.contact_phone_ref = React.createRef()
        this.searchService = new SearchService()
        this.termService = new TermService()
        this.noteService = new NoteService()

        this.updateTags()
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

        _note.tags = extractHashtagsWithIndices(text).map((hashtag: any) => {
            return hashtag.hashtag
        })

        _note.start = this.start?.toJSON()

        _note.contacts = entities.filter((i: any) => { return i.type === "contact" }).map((item: any) => {
            return item.id
        })

        _note.schools = entities.filter((i: any) => { return i.type === "school" }).map((item: any) => {
            return item.id
        })

        // If the time difference is larger then a minute, display it.
        const timePassed = moment().diff(this.start, "minutes") > 0 ? "~" + moment().diff(this.start, 'minutes') + "m" : ""
        const timeDisplay: string = this.start ?
            this.start.format("hh:mm") + timePassed
            : ""
        this.setState({
            legend: timeDisplay + " " + _note.tags.length + " term(en), " + _note.schools.length + " scholen " + _note.contacts.length + " personen",
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

    updateTags = () => {
        this.termService.retrieveTags().then((result: Term[]) => {
            this.setState({ tags: result })
        })
    }
    handleSubmit = (event: any) => {
        let note: Note = this.state.note || { id: 0, note: "" }
        if (this.state.contact) {
            note.contact_id = this.state.contact.id
            this.postNote(note)
        } else {
            const contactService = new ContactService()
            if (this.contact_name_ref.current && this.contact_phone_ref.current) {
                if (this.contact_name_ref.current?.getValue().length > 4 || this.contact_phone_ref.current?.getValue().length > 4) {
                    contactService.postContact({
                        id: 0,
                        name: this.contact_name_ref.current.getValue(),
                        phone: this.contact_phone_ref.current.getValue(),
                    }).then((c: Contact) => {
                        // Add the new contact to the note and post it.
                        note.contact_id = c.id
                        this.postNote(note)
                    })
                }
            }
        }

        event.preventDefault()
    }

    postNote = (note: Note) => {
        this.noteService.postNote(note).then((result: Note) => {
            this.setState({ note: undefined })
            this.props.afterSubmit()
            this.updateTags()
            const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''), 'apply-entity');
            this.setState({
                suggestions: [] as any[],
                tags: [],
                legend: "",
                editorState
            })

        })

    }

    render() {
        const { MentionSuggestions } = this.mentionPlugin
        const plugins = [this.mentionPlugin, this.hashtagPlugin]
        const defaultTerms: Term[] = this.state.tags.filter((t: Term) => { return t.type === "default" ? true : false })
        const otherTerms: Term[] = this.state.tags.filter((t: Term) => { return t.type !== "default" ? true : false })
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <FormTitle>Contact</FormTitle>
                    <div className="col-2">
                        <Autocomplete id="contact_name" ref={this.contact_name_ref} onSelect={(e?: Contact) => {
                            if (e) {
                                this.setState({ contact: e })
                                this.contact_phone_ref.current?.setValue(e.phone)
                            } else {
                                this.setState({ contact: undefined })
                                //this.contact_phone_ref.current?.setValue("")
                            }

                        }} />
                        <AutocompleteContactByPhone id="contact_phone" ref={this.contact_phone_ref} onSelect={(e?: Contact) => {
                            if (e) {
                                this.setState({ contact: e })
                                this.contact_name_ref.current?.setValue(e.name)
                            } else {
                                this.setState({ contact: undefined })
                                //this.contact_name_ref.current?.setValue("")
                            }
                        }} />
                    </div>
                    <FormTitle>Notitie</FormTitle>
                    <div className={'editor'}>
                        <Editor
                            placeholder="Notitie..."
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            plugins={plugins}
                        />
                        <MentionSuggestions onSearchChange={this.onSearchChange}
                            suggestions={this.state.suggestions} />
                    </div>

                    <div className="legend">{this.state.legend}</div>
                    <FormTitle>Standaard termen</FormTitle>
                    <div className="tag-list">
                        {defaultTerms.map((value: Term) => (
                            <div className={`tag  size${value.notes}`}
                                onClick={this.sendTextToEditor.bind(this, " #" + value.tag + " ")}
                                key={value.id}>
                                {value.tag}
                            </div>
                        ))}
                    </div>
                    {(otherTerms.length > 0) &&
                        <>
                            <FormTitle>Overige termen</FormTitle>
                            <div className="tag-list">
                                {otherTerms.map((value: Term) => (
                                    <div className={`tag  size${value.notes}`}
                                        onClick={this.sendTextToEditor.bind(this, " #" + value.tag + " ")}
                                        key={value.id}>
                                        {value.tag}
                                    </div>
                                ))}
                            </div>
                        </>
                    }
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