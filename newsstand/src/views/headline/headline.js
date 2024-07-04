import AutoRollingNews from "../../components/autoRollingNews/autoRollingNews.js";

export const Headline = () => {
    let element = document.createElement('div');
    element.className = 'headline-container';

    function render() {
        const autoRollingNews1 = AutoRollingNews({
            company: '연합뉴스',
            title: '[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출'
        });
        const autoRollingNews2 = AutoRollingNews({
            company: '중앙일보',
            title: '[2보] 새로운 뉴스 타이틀'
        });

        element.appendChild(autoRollingNews1.element);
        element.appendChild(autoRollingNews2.element);
    }

    render();

    return {
        element
    };
};

export default Headline;
