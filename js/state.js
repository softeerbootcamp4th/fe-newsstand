function State(initialValue, sideEffect)
{
	if(typeof sideEffect !== "function") {
		throw new Error("side effect must be function!");
	}
	this.sideEffects = new Set([sideEffect]);
	this.value = initialValue;
	this.change = (newValue)=>{
		if(this.value === newValue) return;
		const oldValue = this.value;
		this.value = newValue;
		for(let func of this.sideEffects)
		{
			func.call(this, newValue, oldValue);
		}
	}
}

State.prototype.addSideEffect = function(func)
{
	this.sideEffects.add(func);
}

State.prototype.removeSideEffect = function(func)
{
	this.sideEffects.delete(func);
}

State.prototype.valueOf = function()
{
	return this.value;
}

export default State;