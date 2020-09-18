import Configuration from "./configuration"

export type Person = {
    key: string,
    gender: string,
    name: {
        title: string,
        first: string,
        last: string
    },
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    },
    phone: string,
    cell: string
}

type Info = {
    page: number,
    results: number,
    seed: string,
    version: string
}

type PeopleResponse = {
    info: Info,
    results: Person[]
}

class PersonService {
    people: Person[] = []
    config: Configuration
    constructor() {
        this.config = new Configuration()
    }

    async retrievePeople() {
        return fetch(this.config.PEOPLE_COLLECTION_URL)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response)
                }
                return response.json()
            })
            .then(json => {
                console.log("Retrieved people:")
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

export default PersonService