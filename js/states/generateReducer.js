import State from "./state.js";
import LinkedList from "./linkedList.js";
import LinkedListAdaptor from "./linkedListAdaptor.js";
import CursorAdaptor from "./cursorAdaptor.js";

function generateReducer(fullList)
{
	const fullLinkedList = new LinkedList(fullList);
	const subscribedLinkedList = new LinkedList();

	const subscribeFilterState = new State(false);
	const viewTypeState = new State("list");
	const subscribedListState = new LinkedListAdaptor(subscribedLinkedList);
	const cursorState = new CursorAdaptor(fullLinkedList);

	function getDelta()
	{
		return viewTypeState.value === "list" ? 1 : 24;
	}

	return [
		// state
		{
			subFilter : subscribeFilterState,
			viewType : viewTypeState,
			subList: subscribedListState,
			cursor: cursorState
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
			addToSubscription(value)
			{
				subscribedListState.add(value);
			},
			removeFromSubscription(value)
			{
				subscribedListState.delete(value);
			},
			// derived state
			isFirstPage()
			{
				return cursorState.findOffset(-getDelta()) === cursorState.getFirst();
			},
			isLastPage()
			{
				return cursorState.findOffset(getDelta()) === cursorState.getLast();
			},
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