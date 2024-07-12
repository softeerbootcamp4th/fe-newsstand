const keyframes = [
    { transform: "translateY(0)" },
    { transform: "translateY(-49px)" }
];

const options = {
    duration: 500,
};

const leftRolled = new CustomEvent("newsRolled", {
    detail: {
        position: "left"
    }
});

const rightRolled = new CustomEvent("newsRolled", {
    detail: {
        position: "right"
    }
});

const element = document.querySelector(".clipping-box");

export function animateRollingNews({ isLeftStopped, isRightStopped }) {
    const [leftNewsTitle, rightNewsTitle] = Array.from(document.getElementsByClassName("content-sub-header__news-header"));
    const [leftHiddenNewsTitle, rightHiddenNewsTitle] = Array.from(document.getElementsByClassName("content-sub-header__news-header_invisible"));

    setTimeout(() => {
        requestAnimationFrame(() => {
            startRollingNewsAnimation({
                left: { isStopped: isLeftStopped, titles: [leftNewsTitle, leftHiddenNewsTitle] },
                right: { isStopped: isRightStopped, titles: [rightNewsTitle, rightHiddenNewsTitle] }
            });
        })
    }, 5000);
}

function startRollingNewsAnimation({ left, right }) {
    if (!left.isStopped) {
        left.titles.forEach((title, index) => {
            const animation = title.animate(keyframes, options);
            animation.onfinish = () => {
                if (index === 1) element.dispatchEvent(leftRolled);
            };
        });
    }

    setTimeout(() => {
        if (!right.isStopped) {
            right.titles.forEach((title, index) => {
                const animation = title.animate(keyframes, options);
                animation.onfinish = () => {
                    if (index === 1) element.dispatchEvent(rightRolled);

                };
            });
        }
    }, 1000);

    setTimeout(() => {
        requestAnimationFrame(() => startRollingNewsAnimation({ left, right }));
    }, 5000);
}
