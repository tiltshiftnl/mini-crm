import Configuration from "./configuration"
import { School } from "./school-service"

export type Contact = {
    id: number,
    name: string,
    phone: string,
    email: string,
    school_id?: number,
    school?: School
}

class ContactService {
    contacts: Contact[] = []
    config: Configuration
    constructor() {
        this.config = new Configuration()
    }

    async retrieveContact(id: number) {
        return fetch(this.config.API_BASE_URL + "/v1/contact/" + id)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response)
                }
                return response.json()
            })
            .then(json => {
                const item = json
                return item
            })
            .catch(error => {
                this.handleError(error)
            })
    }

    async retrieveContacts() {
        return fetch(this.config.API_BASE_URL + "/v1/contacts")
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

    async searchContacts(search: string) {
        return fetch(this.config.API_BASE_URL + "/v1/contacts/" + search)
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

    async postContact(contact: Contact) {
        return fetch(this.config.API_BASE_URL + "/v1/contact",
            {
                method: "POST",
                body: JSON.stringify(contact),
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

export default ContactService