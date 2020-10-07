import { Service } from "./service"

export type Term = {
    id: number
    tag: string
    type?: string
    notes: number
}

class TermService extends Service {
    async retrieveTags() {
        return fetch(this.config.API_BASE_URL + "/v1/tags")
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
}

export default TermService
