import Configuration from "./configuration"

export abstract class Service<T> {
    config: Configuration
    constructor() {
        this.config = new Configuration()
    }
    handleResponseError(response: Response) {
        throw new Error("HTTP error, status = " + response.status)
    }

    handleError(error: Error) {
        throw error
    }

    abstract async search(value: string): Promise<T[]>
    abstract async retrieve(): Promise<T[]>
}