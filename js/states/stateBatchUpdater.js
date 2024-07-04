const stateBatchUpdater = {
	pendingTasks: new Map(),
	hasPendingTask: false,
	pendingSideEffects: new Map(),
	callUpdate(state, newValue) {
		this.pendingTasks.set( state, newValue );
		if(this.hasPendingTask) return;
		this.hasPendingTask = true;

		// 다음 프레임에 상태를 변경하고 사이드이펙트를 실행시킨다.
		requestAnimationFrame( ()=>{
			let sideEffects = new Map();
			for(let [st, nv] of this.pendingTasks)
			{
				st.__applyChange(nv);
			}
			this.callSideEffects();
			this.pendingTasks.clear();
			this.hasPendingTask = false;
		} );
	},
	// 저장된 모든 사이드이펙트에 대해, {func : [ {stateKey:newState}, {stateKey:oldState} ]}로 변경하는걸 수행
	__appendSideEffects(stateSideEffects, newValue, oldValue)
	{
		for(let [sideEffect, stateKey] of stateSideEffects)
		{
			let newStates, oldStates;
			if(this.pendingSideEffects.has(sideEffect))
			{
				[newStates, oldStates] = this.pendingSideEffects.get(sideEffect);
			}
			else
			{
				[newStates, oldStates] = [{}, {}];
				this.pendingSideEffects.set(sideEffect, [newStates, oldStates]);
			}
			newStates[stateKey] = newValue;
			oldStates[stateKey] = oldValue;
		}
	},
	// 함수를 중복되지 않도록 실행한다.
	callSideEffects()
	{
		for(let [func, stateDifferences] of this.pendingSideEffects)
		{
			// 사이드이펙트의 key가 default이고 유일하면, 콜백함수에서 원시값으로 변경값을 참조할수있음

			let stateDiffenecesArr = Object.keys(stateDifferences[0]);
			if(stateDiffenecesArr.length === 1)
			{
				let onlyKey = stateDiffenecesArr[0];
				if(onlyKey === "default") func(stateDifferences[0].default, stateDifferences[1].default);
				else func(...stateDifferences);
			}
			else
			{
				func(...stateDifferences);
			}
		}
		this.pendingSideEffects.clear();
	}
};

export default stateBatchUpdater;