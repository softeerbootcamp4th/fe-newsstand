const toastEl = document.getElementById("subscribeToast");
const TOAST_DURATION = 2 * 1000; // 2초
let currentTimeout = null;

function showToast()
{
	clearTimeout(currentTimeout);
	toastEl.classList.add("active");
	currentTimeout = setTimeout( ()=>toastEl.classList.remove("active"), TOAST_DURATION );
}

export default showToast;