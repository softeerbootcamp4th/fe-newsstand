import { NEWS } from "../data/data.js"

const reducer = {
    state: {
        viewMode: "list", // "grid"
        fliter: "all" // "myCompanies"
    },
    actions: {},
    click: function click(event) {
        const element = event.target
        if (element.classList.contains("mainContentSelectorElement")) {
            if (element.classList.contains("all")) {
                this.state = "all"
                this.actions["changeFilter"]("all")
                this.actions["showAll"](NEWS)
            }
            else if (element.classList.contains("myCompanies")) {
                this.actions["changeFilter"]("myCompanies")
                this.actions["showMyCompanies"](NEWS)
                this.state = "myCompanies"
            }
        }
        else if (element.closest(".subscribeButton")) {
            if (findClosestParentByClass(element, "isSubscribed")) {
                setTimeout(() => { this.actions["changeFilter"]("all") }, 5000)
            }
            else {
                setTimeout(() => { this.actions["changeFilter"]("myCompanies") }, 5000)
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

function reducerInit(actions, ...components) {
    actions.forEach((action) => {
        action().forEach((value, key) => {
            reducer.actions[key] = value
        })
    })

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

export { reducer, reducerInit }

