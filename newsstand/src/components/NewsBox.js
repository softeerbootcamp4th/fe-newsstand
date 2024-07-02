import useState from '../core/hooks/useState.js';

const NewsBox = (props) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseOver = () => {
        setIsHover(true);
        console.log(props.icon + " HOVER!");
    };

    const handleMouseOut = () => {
        setIsHover(false);
        console.log(props.icon + " UNHOVER!");
    };

    const bindEvents = () => {
        const newsBox = document.getElementById(`news-box-${props.icon}`); 
        newsBox.addEventListener('mouseover', handleMouseOver);
        newsBox.addEventListener('mouseout', handleMouseOut);
    };

    return {
        element: `
        <div class="news-box-container" id="news-box-${props.icon}">
            ${isHover ? "HOVERED" : props.icon}
        </div>
        `,
        bindEvents,
    };
}

export default NewsBox;
