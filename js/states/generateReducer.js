import State from "./state.js";
import DerivedState from "./derivedState.js";
import LinkedList from "./linkedList.js";
import LinkedListAdaptor from "./linkedListAdaptor.js";
import CursorAdaptor from "./cursorAdaptor.js";

function generateReducer(fullList)
{
	const fullLinkedList = new LinkedList(fullList);
	const subscribedLinkedList = new LinkedList();

	// state
	const subscribeFilterState = new State(false);
	const viewTypeState = new State("list");
	const subscribedListState = new LinkedListAdaptor(subscribedLinkedList);
	const cursorState = new CursorAdaptor(fullLinkedList);

	const GRID_ITEMS_PER_PAGE = 24;

	function getDelta()
	{
		return viewTypeState.value === "list" ? 1 : GRID_ITEMS_PER_PAGE;
	}

	// derived state
	const isFirstPage = new DerivedState( ()=>{
		return cursorState.findOffset(-getDelta()) === null;
	}, [cursorState, viewTypeState, subscribeFilterState, subscribedListState] );
	const isLastPage = new DerivedState( ([cursor, viewType, subscFilter, subscList])=>{
		// 리스트에서 구독이 취소되었을 때, 다음 버튼이 존재했다면 그것을 유지시키기 위함.
		// 그리드에서는 동적으로 내용이 바뀌므로 필요없음
		if(subscFilter && viewType === "list" && cursorState.isOutOfList()) {
			return cursorState.findOffset(0) === null;
		}
		return cursorState.findOffset(getDelta()) === null;
	}, [cursorState, viewTypeState, subscribeFilterState, subscribedListState] );

	return [
		// state
		{
			subFilter : subscribeFilterState,
			viewType : viewTypeState,
			subList: subscribedListState,
			cursor: cursorState,
			isFirstPage,
			isLastPage
		},
		// reducer
		{
			// setter
			moveLeft()
			{
				cursorState.moveBefore(getDelta());
			},
			moveRight()
			{
				cursorState.moveNext(getDelta());
			},
			moveTo(to)
			{
				cursorState.moveTo(to);
			},
			setFullView()
			{
				subscribeFilterState.change(false);
				viewTypeState.change("grid");
				cursorState.changeLinkedList(fullLinkedList);
				cursorState.moveFirst();
			},
			setSubscribedView()
			{
				subscribeFilterState.change(true);
				viewTypeState.change("list");
				cursorState.changeLinkedList(subscribedLinkedList);
				cursorState.moveFirst();
			},
			setGridView()
			{
				viewTypeState.change("grid");
				cursorState.moveFirst();
			},
			setListView()
			{
				viewTypeState.change("list");
				cursorState.moveFirst();
			},
			addToSubscription(value, prevCache)
			{
				subscribedListState.add(value, prevCache);
				if(viewTypeState.value === "list")
				{
					subscribeFilterState.change(true);
					cursorState.changeLinkedList(subscribedLinkedList);
					cursorState.moveTo(value);
				}
			},
			removeFromSubscription(value)
			{
				subscribedListState.delete(value);
				//if(viewTypeState.value === "list") cursorState.moveNext(1); // 다르게 구현함(구독 해지해도 원래게 보이게)
			},
			// derived state
			beforeCursor()
			{
				return cursorState.findOffset(-getDelta());
			},
			afterCursor()
			{
				return cursorState.findOffset(getDelta());
			},
		}
	];
}

export default generateReducer;