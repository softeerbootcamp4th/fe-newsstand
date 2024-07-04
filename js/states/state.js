import stateBatchUpdater from "./stateBatchUpdater.js";

function State(initialValue, sideEffect=null)
{
	if(sideEffect !== null && typeof sideEffect !== "function") {
		throw new Error("side effect must be function!");
	}
	this.__sideEffects = new Set();
	if( typeof sideEffect === "function" ) this.__sideEffects.add(sideEffect);
	this.value = initialValue;
	this.__applyChange = (newValue)=>{
		if(this.value === newValue) return;
		const oldValue = this.value;
		this.value = newValue;
		for(let func of this.__sideEffects)
		{
			func.call(this, newValue, oldValue);
		}
	}
}

State.prototype.change = function(newValue)
{
	stateBatchUpdater.callUpdate(this, newValue);
}

State.prototype.addSideEffect = function(func)
{
	this.__sideEffects.add(func);
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