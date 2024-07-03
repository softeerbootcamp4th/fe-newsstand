// createElement.js

import { componentRegistry } from './registerComponent.js';

export const createElement = (type, props, ...children) => {
    let element;

    if (typeof type === 'string' && componentRegistry[type]) {
        // If the type is a string and exists in the component registry
        element = componentRegistry[type](props, children);
    } else if (typeof type === 'function') {
        // If the type is a function (functional component)
        element = type(props);
    } else {
        // If the type is a regular HTML element
        element = document.createElement(type);

        for (let [key, value] of Object.entries(props || {})) {
            if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.substring(2).toLowerCase(), value);
            } else {
                element.setAttribute(key, value);
            }
        }
    }

    // 처리할 children 배열을 확인하여 각 child를 처리합니다.
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        } else if (typeof child === 'object' && child !== null) {
            // Assuming child is an object representing a component
            element.appendChild(createElement(child.type, child.props, ...(child.children || [])));
        }
    });

    return element;
};
