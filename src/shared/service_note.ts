import { Service } from "./service"
import { Contact } from "./service_contact"
import { School } from "./service_school"
import { Term } from "./service_term";

export type Note = {
    id: number
    note: string
    contact?: Contact
    contact_id?: number
    start?: string
    end?: string
    tags?: Term[]
    schools?: School[]
    contacts?: Contact[]
}

class NoteService extends Service<Note>{
    async retrieve(): Promise<Note[]> {
        var uri = this.config.API_BASE_URL + "/v2/notes";
        return fetch(uri, {credentials: 'include'})
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

    async search() {
        return new Promise<Note[]>(() => {
            return [] as Note[]
        })
    }

    async retrieveNotesContact(contact: Contact) {
        var uri = this.config.API_BASE_URL + "/v2/contact/" + contact.id + "/notes";
        return fetch(uri, {credentials: 'include'})
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
        return fetch(uri, {credentials: 'include'})
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
                },
                credentials: 'include'
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
}

export default NoteService
