import Configuration from "./configuration"

export type Term = {
    id: number,
    tag: string,
    notes: number
}

class TermService {
    config: Configuration
    constructor() {
        this.config = new Configuration()
    }

    async retrieveTags() {
        return fetch(this.config.API_BASE_URL + "/tags")
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

    handleResponseError(response: Response) {
        throw new Error("HTTP error, status = " + response.status)
    }

    handleError(error: Error) {
        console.log(error.message)
    }
}

export default TermService