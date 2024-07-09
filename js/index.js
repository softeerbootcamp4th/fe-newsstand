import rawData from "./rawData.js";
import processListPagination from "./processData/processListPagination.js";
import generateReducer from "./states/generateReducer.js";

import mountLeftSelector from "./views/mountLeftSelector.js";
import mountRightSelector from "./views/mountRightSelector.js";
import mountPageMoverSelector from "./views/mountPageMoverSelector.js";
import mountRoller from "./roller/mountRoller.js"

import mountView from "./views/mainView.js";

const {list: fullList, metadata} = processListPagination(rawData);
const [state, reducer, initialize] = generateReducer(fullList);

const rollers = document.getElementsByClassName("roller");

mountLeftSelector(state.subFilter, reducer.setFullView, reducer.setSubscribedView);
mountRightSelector(state.viewType, reducer.setListView, reducer.setGridView);
mountPageMoverSelector(state, reducer);
mountView(state, reducer, fullList, metadata);
mountRoller(rollers[0], ["hello", "world", "yes", "fourth", "fifth"]);
setTimeout(()=>{
	mountRoller(rollers[1], ["hello2", "world2", "yes2", "fourth2", "fifth2"]);
}, 1000);
initialize();

state.subFilter.addSideEffect( (e)=>console.log(`chnge sub filter : ${e}`) );
state.viewType.addSideEffect( (e)=>console.log(`chnge view type : ${e}`) );
state.subList.addSideEffect( (e)=>console.log(`change subList : ${e}`) );