import Configuration from "./configuration"

class SearchService {
    config: Configuration
    constructor() {
        this.config = new Configuration()
    }

    async searchAny(search: string) {
        if(search.length === 0) {
            return []
        }
        return fetch(this.config.API_BASE_URL + "/v1/search/" + search)
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

export default SearchService