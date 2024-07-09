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
                this.actions["changeFilter"]("all")
            }
            else {
                this.actions["changeFilter"]("myCompanies")
            }
        }
        else if (findClosestParentByClass(element, "mainContentNavElement")) {
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

