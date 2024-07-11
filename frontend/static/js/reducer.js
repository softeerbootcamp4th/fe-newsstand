import newsstandFetcher from "./apis/newstandFetcher.js";
import * as alert from "./component/alert/alert.js";

const reducer = {
    state: {
        viewMode: "list", // "grid"
        fliter: "all" // "myCompanies"
    },
    actions: {},
    domDidLoads: {},
    loadComplete: async function () {
        const news = await newsstandFetcher.getAllCompanies()
        this.domDidLoads["ticker"](news);
        this.domDidLoads["mainContent"](news);
    },
    click: async function click(event) {
        const element = event.target
        if (element.classList.contains("mainContentSelectorElement")) {
            if (element.classList.contains("all")) {
                const news = await newsstandFetcher.getAllCompanies()
                this.state = "all"
                this.actions["changeFilter"]("all")
                this.actions["showAll"](news)
            }
            else if (element.classList.contains("myCompanies")) {
                const news = await newsstandFetcher.getMyCompanies()
                this.actions["changeFilter"]("myCompanies")
                this.actions["showMyCompanies"](news)
                this.state = "myCompanies"
            }
        }
        else if (element.closest(".subscribeButton")) {
            if (findClosestParentByClass(element, "isSubscribed")) {
                alert.showUnSubsribeAlert("서창교언론사", async () => {
                    const news = await newsstandFetcher.getAllCompanies()
                    this.state = "all"
                    this.actions["changeFilter"]("all")
                    this.actions["showAll"](news)
                })
            }
            else {
                alert.showSubscribeAlert(async () => {
                    const news = await newsstandFetcher.getMyCompanies()
                    this.actions["changeFilter"]("myCompanies")
                    this.actions["showMyCompanies"](news)
                })
            }
        }
        else if (findClosestParentByClass(element, "articlesPreviousButton")) {
            this.actions["previousArticle"]()
        }
        else if (findClosestParentByClass(element, "articlesNextButton")) {
            this.actions["nextArticle"]()
        }
    }
}

function reducerInit(actions, domDidLoads, ...components) {
    actions.forEach((action) => {
        action().forEach((value, key) => {
            reducer.actions[key] = value
        })
    })
    reducer.domDidLoads = domDidLoads

    return components.join("")
}

function findClosestParentByClass(element, className) {
    while (element && element !== document) {
        if (element.classList.contains(className)) {
            return true;
        }
        element = element.parentNode;
    }
    return false;
}

export { reducer, reducerInit };

