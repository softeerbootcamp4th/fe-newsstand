import Fetcher from "./fetcher.js";

class NewsstandFetcher extends Fetcher {
    constructor() {
        super("http://localhost:3001/data");
    }

    getAllCompanies = async () => await super.get("")
    getMyCompanies = async () => (await super.get("")).filter(element => element.isSubscribe)
    updateSubscribe = async (id, isSubscribe) => await super.patch({ isSubscribe: isSubscribe }, id)
}

const newsstandFetcher = new NewsstandFetcher()

export default newsstandFetcher
