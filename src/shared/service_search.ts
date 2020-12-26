import { Service } from "./service"

export type Hit = {
    avatar: string
    id: number
    key: string
    name: string
    type: "contact" | "school"
}

class SearchService extends Service<Hit> {
    async search(search: string) {
        if (search.length === 0) {
            return []
        }
        return fetch(this.config.API_BASE_URL + "/v1/search/" + search, {credentials: 'include'})
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
    async retrieve() {
        return new Promise<Hit[]>(() => {
            return [] as Hit[]
        })
    }
}

export default SearchService
