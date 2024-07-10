import stateBatchUpdater from "./stateBatchUpdater.js";

function State(initialValue, sideEffect=null)
{
	if(sideEffect !== null && typeof sideEffect !== "function") {
		throw new Error("side effect must be function!");
	}

	this.__sideEffects = new Map();
	if( typeof sideEffect === "function" ) this.__sideEffects.set(sideEffect, "default");

	this.value = initialValue;
	this.__applyChange = (valueChanger)=>{
		const oldValue = this.value;
		const newValue = typeof valueChanger === "function" ? valueChanger( oldValue ) : valueChanger;

		if(this.value === newValue) return;
		this.value = newValue;
		stateBatchUpdater.__appendSideEffects(this.__sideEffects, newValue, oldValue);
	}
}

State.prototype.change = function(newValue)
{
	stateBatchUpdater.callUpdate(this, newValue);
}

State.prototype.addSideEffect = function(func, key="default")
{
	this.__sideEffects.set(func, key);
}

State.prototype.removeSideEffect = function(func)
{
	this.__sideEffects.delete(func);
}

State.prototype.valueOf = function()
{
	return this.value;
}

export default State;