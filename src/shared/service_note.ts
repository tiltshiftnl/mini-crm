import Configuration from "./configuration"
import { Contact } from "./service_contact"
import { School } from "./service_school"

export type Note = {
    id: number
    note: string
    contact?: Contact
    contact_id?: number
    start?: string
    end?: string
    tags?: string[]
    schools?: number[] | School[]
    contacts?: number[] | Contact[]
}

class NoteService {
    config: Configuration
    constructor() {
        this.config = new Configuration()
    }

    async retrieveNotes() {
        var uri = this.config.API_BASE_URL + "/v2/notes";
        return fetch(uri)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response)
                }
                return response.json()
            })
            .then(json => {
                const items = json
                return items
            })
            .catch(error => {
                this.handleError(error)
            })
    }

    async retrieveNotesContact(contact: Contact) {
        var uri = this.config.API_BASE_URL + "/v2/contact/" + contact.id + "/notes";
        return fetch(uri)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response)
                }
                return response.json()
            })
            .then(json => {
                const items = json
                return items
            })
            .catch(error => {
                this.handleError(error)
            })
    }

    async retrieveNotesSchool(school: School) {
        var uri = this.config.API_BASE_URL + "/v2/school/" + school.id + "/notes";
        return fetch(uri)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response)
                }
                return response.json()
            })
            .then(json => {
                const items = json
                return items
            })
            .catch(error => {
                this.handleError(error)
            })
    }

    async postNote(note: Note) {
        return fetch(this.config.API_BASE_URL + "/v2/note",
            {
                method: "POST",
                body: JSON.stringify(note),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response)
                }
                return response.json()
            })
            .then(json => {
                return json
            })
            .catch(error => {
                this.handleError(error)
            })
    }

    handleResponseError(response: Response) {
        throw new Error("HTTP error, status = " + response.status)
    }

    handleError(error: Error) {
        console.log(error.message)
    }
}

export default NoteService
