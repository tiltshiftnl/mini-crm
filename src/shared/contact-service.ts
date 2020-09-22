import Configuration from "./configuration"
import { School } from "./school-service"

export type Contact = {
    id: number,
    naam: string,
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

    async retrieveContacts() {
        return fetch(this.config.CONTACT_COLLECTION_URL)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response)
                }
                return response.json()
            })
            .then(json => {
                console.log("Retrieved contacts:")
                const items = json
                console.log(items)
                return items
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