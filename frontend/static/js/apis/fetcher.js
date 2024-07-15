class Fetcher {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async get(endpoint) {
        const response = await fetch(`${this.baseURL}/${endpoint}`)

        if (!response.ok) {
            throw new Error("request failed.")
        }

        try {
            const data = await response.json()
            return data
        }
        catch {
            throw new Error("parsing failed.")
        }
    }

    async patch(data, endpoint) {
        const jsonData = JSON.stringify(data);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`${this.baseURL}/${endpoint}`, {
            method: "PATCH",
            headers: headers,
            body: jsonData,
            redirect: "follow"
        })
        if (!response.ok) {
            throw new Error("request failed.")
        }

        try {
            const data = await response.json()
            return data
        }
        catch {
            throw new Error("parsing failed.")
        }
    }
}


export default Fetcher
