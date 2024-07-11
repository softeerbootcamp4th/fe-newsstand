export function showSubscribeAlert(action) {
    let alertContainer = document.createElement(`div`)
    alertContainer.className = "alert_Container alert_subscribe"
    alertContainer.innerText = "내가 구독한 언론사에 추가되었습니다."
    document.body.appendChild(alertContainer)

    setTimeout(() => {
        document.querySelector(".alert_Container").remove()
        action()
    }, 5000)
}

export function showUnSubsribeAlert(companyName, action) {
    let alertContainer = document.createElement("div")
    alertContainer.className = "alert_Container alert_unsubscribe"

    const cancelAction = () => document.querySelector(".alert_Container.alert_unsubscribe").remove()

    const render = () =>
        `<div class="alert_title"><span style="color: #14212B; font-weight: 700;">${companyName}</span>을(를)<br> 구독해지하시겠습니까?</div>
         <div class="Layout__row">
            <div class="alert_button left hover-underline">예, 해지합니다</div>
            <div class="alert_button right hover-underline">아니오</div>
         </div>
        `

    alertContainer.insertAdjacentHTML("beforeend", render());
    alertContainer.querySelector(".alert_button.right").addEventListener('click', cancelAction)
    alertContainer.querySelector(".alert_button.left").addEventListener('click', () => {
        document.querySelector(".alert_Container").remove()
        action()
    })

    document.body.appendChild(alertContainer);
}
