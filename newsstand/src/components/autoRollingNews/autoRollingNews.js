export const AutoRollingNews = (props) => {
    const newsStrings = [
        {
            press: "연합뉴스",
            link: "",
            title: "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        },
        {
            press: "연합뉴스",
            link: "",
            title: "[2보] 새로운 뉴스 타이틀",
        },
        {
            press: "연합뉴스",
            link: "",
            title: "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        },
        {
            press: "연합뉴스",
            link: "",
            title: "[2보] 새로운 뉴스 타이틀",
        },
        {
            press: "연합뉴스",
            link: "",
            title: "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        },
        {
            press: "연합뉴스",
            link: "",
            title: "[2보] 새로운 뉴스 타이틀",
        }
    ];

    let currentIndex = 0;
    let element = document.createElement('div');
    element.className = 'autoRollingNews-container';

    let interval;

    document.addEventListener('DOMContentLoaded', () => {
        interval = setInterval(rollingCallback, 3000);

        const container =  document.querySelector('.autoRollingNews-container')
        console.log(container)

        container.addEventListener('mouseover', function() {
            console.log('냥')
            clearInterval(interval);
        });

        container.addEventListener('mouseout', function() {
            interval = setInterval(rollingCallback, 3000);
        });
    });

    function rollingCallback() {
        currentIndex = (currentIndex + 1) % newsStrings.length;
        render();
    }

    function render() {
        const { press, title, link } = newsStrings[currentIndex];

        const html = `
            <div class="autoRollingNews-item animate-out">
                <p class="autoRollingNews-company">${press}</p>
                <a class="autoRollingNews-title" href="${link}">${title}</a>
            </div>
        `;
        element.innerHTML = html;

        setTimeout(() => {
            const item = element.querySelector('.autoRollingNews-item');
            item.classList.remove('animate-out');
            item.classList.add('animate-in');
        }, 100);
    }

    function updateProps(newProps) {
        props = newProps;
        render();
    }

    return {
        element,
        updateProps
    };
};

export default AutoRollingNews;