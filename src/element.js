
/* Provide a blueprint for the render method */
export function createElement(type, props={}, childarr=[]) {
    const children = [];
    for (const child of childarr) {
        typeof child == "string"
            ? children.push({type: "TEXT", props: {nodeValue: child}, children: []})
            : children.push(child);
    }
    return { type, props, children };
}
