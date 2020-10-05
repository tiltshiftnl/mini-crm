import Configuration from "./configuration"

export type School = {
    id: number,
    school_id: number,
    lrkp_id?: string,
    school_type: string,
    brin?: string,
    vestigingsnummer?: string,
    name: string,
    type: string,
    address: string
}

type SchoolResponse = {
    results: School[]
}

class SchoolService {
    schools: School[] = []
    config: Configuration
    constructor() {
        this.config = new Configuration()
    }

    async retrieveSchools() {
        return fetch(this.config.API_BASE_URL + "/v1/schools")
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

    async search(search: string) {
        return fetch(this.config.API_BASE_URL + "/v1/schools/" + search)
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

export default SchoolService