const ImageView = (props) => {
    return {
        element: `
        <img class="image-view" src="${props.src}" alt="image"/>
        `,
    }
}

export default ImageView
