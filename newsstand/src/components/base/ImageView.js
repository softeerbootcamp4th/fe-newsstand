const ImageView = (props) => {
    return {
        element: `
        <img class="icon-view" src="${props.src}" alt="icon"/>
        `,
    }
}

export default ImageView
