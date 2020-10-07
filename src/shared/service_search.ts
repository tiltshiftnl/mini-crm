import { Service } from "./service"

class SearchService extends Service {
    async searchAny(search: string) {
        if (search.length === 0) {
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
}

export default SearchService
