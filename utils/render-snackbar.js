
/**
 * @description snackbar를 렌더하는 함수
 */
export function renderSnackbar(text, id) {
    const bodyDOM = document.querySelector("body");
    const snackbarDOMString = `
    <section id="snackbar-${id}" class="snackbar__wrapper">
        <section class="snackbar__container">
            <p class="text__medium16 text__white--default">${text}</p>
        </section>
    </section>`;
    
    bodyDOM.insertAdjacentHTML("beforeend", snackbarDOMString);

    /**
     * 5초 후 snackbar 삭제 로직
     */
    let snackbarId = null;
    const snackbarWrapperDOM = document.querySelector(`#snackbar-${id}`);
    snackbarId = setTimeout(() => {
        bodyDOM.removeChild(snackbarWrapperDOM);
        snackbarId = null;
    }, 5000);

    /**
     * snackbar 외부 영역 클릭 시 snackbar 삭제 로직
     */
    snackbarWrapperDOM.addEventListener("click", clickSnackbarOutside);
    function clickSnackbarOutside(e) {
        if (e.target !== snackbarWrapperDOM) {
            return;
        }

        if (snackbarId !== null) {
            clearTimeout(snackbarId);
            snackbarId = null;
        }

        const bodyDOM = document.querySelector("body");
        bodyDOM.removeChild(snackbarWrapperDOM);
    }
}
