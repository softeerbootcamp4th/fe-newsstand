import { TOGGLE } from "./magicNumber.js";

function generateState() {
    const data = {
        toggleName: TOGGLE.ALL,
        selectedTabIndex: 0,
        selectedArticleIndex: 0,
        selectedCompanyIndex: 0,
        isDragging: false,
        subscribedCompanyNameSet: new Set(),
        previewArticleData: {},
        articleDataList: [],
        companiesWithArticles: {}
    }
    return {
        getter: {
            getToggleName: () => data.toggleName,
            getSelectedTabIndex: () => data.selectedTabIndex,
            getSelectedArticleIndex: () => data.selectedArticleIndex,
            getSelectedCompanyIndex: () => data.selectedCompanyIndex,
            getIsDragging: () => data.isDragging,
            getSubscribedCompanyNameSet: () => data.subscribedCompanyNameSet,
            getPreviewArticleData: () => data.previewArticleData,
            getArticleDataList: () => data.articleDataList,
            getCompaniesWithArticles: () => data.companiesWithArticles,
        },
        setter: {
            setToggleName: (value) => data.toggleName = value,
            setSelectedTabIndex: (value) => data.selectedTabIndex = value,
            setSelectedArticleIndex: (value) => data.selectedArticleIndex = value,
            setSelectedCompanyIndex: (value) => data.selectedCompanyIndex = value,
            setIsDragging: (value) => data.isDragging = value,
            setSubscribedCompanyNameSet: (value) => data.subscribedCompanyNameSet = value,
            setPreviewArticleData: (value) => data.previewArticleData = value,
            setArticleDataList: (value) => data.articleDataList = value,
            setCompaniesWithArticles: (value) => data.companiesWithArticles = value
        }
    }
}
const state = generateState();
export default state;