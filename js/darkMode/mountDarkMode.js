import State from "../states/state.js";
// import systemDarkMode from "../index.html"; 다크모드의 판별을 렌더링을 볼로킹시킨 후 판별하기 위함.

const darkmodeState = new State(systemDarkMode);

function mountDarkModeButton(el)
{
	el.addEventListener("click", ()=>{
		darkmodeState.change( value=>!value );
	});
	darkmodeState.addSideEffect( (state)=>{
		document.documentElement.classList.toggle("dark", state);
		el.classList.toggle("active", state);
	} );
}

export default mountDarkModeButton;