import { Service } from "./service"

export type School = {
    type: string
    id: number
    school_id: number
    lrkp_id?: string
    school_type: string
    brin?: string
    vestigingsnummer?: string
    name: string
    grondslag?: string
    schoolwijzer_url?: string
    heeft_voorschool?: boolean
    leerlingen?: number
    address: string
    postcode?: string
    suburb?: string
    website?: string
    email?: string
    phone?: string
    city?: string
}

class SchoolService extends Service {
    schools: School[] = []

    async retrieveSchool(id: number): Promise<School> {
        return fetch(this.config.API_BASE_URL + "/v3/school/" + id)
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
}

export default SchoolService
