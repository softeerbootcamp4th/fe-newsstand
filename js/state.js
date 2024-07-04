const stateBatchUpdater = {
	pendingTasks: new Map(),
	hasPendingTask: false,
	callUpdate(state, newValue) {
		this.pendingTasks.set( state, newValue );
		if(this.hasPendingTask) return;
		this.hasPendingTask = true;
		requestAnimationFrame( ()=>{
			for(let [st, nv] of this.pendingTasks)
			{
				st.__applyChange(nv);
			}
			this.pendingTasks.clear();
			this.hasPendingTask = false;
		} );
	}
};

function State(initialValue, sideEffect)
{
	if(typeof sideEffect !== "function") {
		throw new Error("side effect must be function!");
	}
	this.__sideEffects = new Set([sideEffect]);
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