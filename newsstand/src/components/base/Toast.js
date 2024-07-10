const Toast = (props) => {
    return {
        element: `
        <div class="toast" id="toast">
            <p>${props.text}</p>
        </div>
        `,
    }
}

export default Toast
