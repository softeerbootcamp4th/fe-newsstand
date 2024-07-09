import rawData from "./rawData.js";
import processListPagination from "./processData/processListPagination.js";
import getRollerData from "./processData/getRollerData.js";
import generateReducer from "./states/generateReducer.js";

import mountLeftSelector from "./views/mountLeftSelector.js";
import mountRightSelector from "./views/mountRightSelector.js";
import mountPageMoverSelector from "./views/mountPageMoverSelector.js";
import mountRoller from "./roller/mountRoller.js";
import mountDarkModeButton from "./darkMode/mountDarkMode.js";


import mountView from "./views/mainView.js";

const {list: fullList, metadata} = processListPagination(rawData);
const [firstRoller, secondRoller]= getRollerData();
const [state, reducer, initialize] = generateReducer(fullList);

const rollers = document.getElementsByClassName("roller");

mountLeftSelector(state.subFilter, reducer.setFullView, reducer.setSubscribedView);
mountRightSelector(state.viewType, reducer.setListView, reducer.setGridView);
mountPageMoverSelector(state, reducer);
mountView(state, reducer, fullList, metadata);
mountRoller(rollers[0], firstRoller);
mountRoller(rollers[1], secondRoller, 1);
mountDarkModeButton(document.getElementById("darkModeToggle"));
initialize();

state.subFilter.addSideEffect( (e)=>console.log(`chnge sub filter : ${e}`) );
state.viewType.addSideEffect( (e)=>console.log(`chnge view type : ${e}`) );
state.subList.addSideEffect( (e)=>console.log(`change subList : ${e}`) );