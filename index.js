import { subscribeSwitchBtn } from "./components/subscriptionSwitchBtn/subscriptionSwitchBtn.js";
import { header } from "./components/header/header.js";
import { addSubscribe } from "./components/subscription/addsubscription.js";
import { removeSubscribe } from "./components/subscription/removeSubscription.js";
import { renderRollingBar } from "./components/rollingBar/rollingBar.js";

header();
subscribeSwitchBtn();
addSubscribe();
removeSubscribe();
renderRollingBar();
