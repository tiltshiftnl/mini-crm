import { Service } from "./service"

export type Contact = {
    id: number
    name: string
    phone?: string
    email?: string
}

class ContactService extends Service<Contact> {
    contacts: Contact[] = []

    async retrieveContact(id: number): Promise<Contact> {
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

    async retrieve(): Promise<Contact[]> {
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

    async search(search: string): Promise<Contact[]> {
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

    async searchByPhone(search: string): Promise<Contact[]> {
        return fetch(this.config.API_BASE_URL + "/v2/phone/" + search)
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

    async postContact(contact: Contact): Promise<Contact> {
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
}

export default ContactService
