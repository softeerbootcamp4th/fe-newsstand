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

export default stateBatchUpdater;