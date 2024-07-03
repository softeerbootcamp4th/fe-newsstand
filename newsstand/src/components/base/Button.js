import useState from "../../core/hooks/useState.js";

const buttonVariant = (type) => {
    const variant = {
        white: {
            light: {
                backgroundColor: "#fff",
                color: "gray",
            },
            dark: {
                backgroundColor: "#375a7f",
                color: "#fff",
            },
        },
        gray: {
            light: {
                backgroundColor: "gainsboro",
                color: "gray",
            },
            dark: {
                backgroundColor: "#444950",
                color: "#fff",
            },
        },
    };

    return variant[type].light;
};


const Button = (props) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseOver = () => {
        setIsHover(true);
    };

    const handleMouseOut = () => {
        setIsHover(false);
    };

    const handleMouseClick = () => {
        console.log("CLICKED");
    };

    const bindEvents = () => {
        const button = document.getElementById(`button-${props.id}`);
        button.addEventListener('mouseover', handleMouseOver);
        button.addEventListener('mouseout', handleMouseOut);
        button.addEventListener('click', handleMouseClick);
    };

    const { backgroundColor, color } = buttonVariant(props.variant);

    return {
        element: `
        <div class="button" id="button-${props.id}" style="background-color: ${backgroundColor}; color: ${color};">
            <img class="button-left-icon" src="${props.icon}" alt="icon"/>
            ${props.text}
        </div>
        `,
        bindEvents,
    };
};

export default Button;
