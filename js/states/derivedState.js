import stateBatchUpdater from "./stateBatchUpdater.js";

function DerivedState(func, dependency)
{
	this.__sideEffects = new Map();
	this.value = func(dependency.map( state=>state.value ), null);
	const calculateValue = (des)=>{
		const newValue = func(dependency.map( state=>state.value ), this.value);
		if(this.value !== newValue) stateBatchUpdater.callUpdate(this, newValue);
	}
	dependency.forEach( (state, i)=>state.addSideEffect(calculateValue, i) );

	this.__applyChange = (newValue)=>{
		if(this.value === newValue) return;
		const oldValue = this.value;
		this.value = newValue;
		stateBatchUpdater.__appendSideEffects(this.__sideEffects, newValue, oldValue);
	}
}

DerivedState.prototype.addSideEffect = function(func, key="default")
{
	this.__sideEffects.set(func, key);
}

DerivedState.prototype.removeSideEffect = function(func)
{
	this.__sideEffects.delete(func);
}

DerivedState.prototype.valueOf = function()
{
	return this.value;
}

export default DerivedState;
