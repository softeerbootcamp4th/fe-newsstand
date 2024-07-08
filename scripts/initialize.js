import { loadSubscribeCompanies } from "./subscribe.js";

export function initialize(state) {
    loadSubscribeCompanies(state);
}