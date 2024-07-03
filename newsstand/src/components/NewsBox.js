import useState from '../core/hooks/useState.js';

const NewsBox = (props) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseOver = () => {
        setIsHover(true);
    };

    const handleMouseOut = () => {
        setIsHover(false);
    };

    const bindEvents = () => {
        const newsBox = document.getElementById(`news-box-${props.id}`); 
        newsBox.addEventListener('mouseover', handleMouseOver);
        newsBox.addEventListener('mouseout', handleMouseOut);
    };

    return {
        element: `
        <div class="news-box-container" id="news-box-${props.id}">
            ${isHover ? "HOVERED" : props.icon}
        </div>
        `,
        bindEvents,
    };
}

export default NewsBox;
