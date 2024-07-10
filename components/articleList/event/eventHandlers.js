import { addCategorySelectionEventListener,
    addScrollEventListener,
    addModeSelectionEventListener,
} from "./clickEvent.js"

export const handleGridSubscription = () => {
    addCategorySelectionEventListener();
    addScrollEventListener();
    addModeSelectionEventListener();
}