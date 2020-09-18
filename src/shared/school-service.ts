import Configuration from "./configuration"

export type School = {
    id: string,
    naam: string,
    type: string,
    location_lat: number,
    location_long: number,
    indexnaam: string,
    slug: string,
    principe?: string,
    denominatie: string,
    main_image_id?: string,
    neemt_deel_aan_aanmeldprocedure?: string,
    einddatum: string,
    created: string,
    afwijkend_tekstlabel?: string,
    stedelijke_functie: string,
    voorschools: string
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
        return fetch(this.config.SCHOOL_COLLECTION_URL)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response)
                }
                return response.json()
            })
            .then(json => {
                console.log("Retrieved schools:")
                const items = json.results
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

export default SchoolService