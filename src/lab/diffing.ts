export const diffingRender = (cur: ChildNode, nxt: ChildNode) => {
  if (!cur || !nxt) {
    return;
  }

  if (!(cur instanceof HTMLElement && nxt instanceof HTMLElement)) {
    if (cur.textContent !== nxt.textContent) {
      cur.replaceWith(nxt);
    }
    return;
  }

  if (cur.tagName !== nxt.tagName) {
    cur.replaceWith(nxt);
    return;
  }

  const forceUpdate = nxt.getAttribute("forced") === "true";
  if (forceUpdate) {
    cur.replaceWith(nxt);
    return;
  }

  const curAttrs = cur.attributes ?? {};
  const nxtAttrs = nxt.attributes ?? {};

  // Update attributes
  for (const { name, value } of Array.from(nxtAttrs)) {
    if (cur.getAttribute(name) !== value) {
      cur.setAttribute(name, value);
    }
  }
  // Remove old attributes
  for (const { name } of Array.from(curAttrs)) {
    if (!nxtAttrs.getNamedItem(name)) {
      cur.removeAttribute(name);
    }
  }

  // Update children
  const curChildren = Array.from(cur.childNodes);
  const nxtChildren = Array.from(nxt.childNodes);

  const maxLen = Math.max(curChildren.length, nxtChildren.length);
  for (let i = 0; i < maxLen; i++) {
    const curChild = curChildren[i];
    const nxtChild = nxtChildren[i];
    if (curChild && nxtChild) {
      diffingRender(curChild, nxtChild);
    } else if (!curChild && nxtChild) {
      cur.appendChild(nxtChild);
    } else if (curChild && !nxtChild) {
      cur.removeChild(curChild);
    }
  }
};
