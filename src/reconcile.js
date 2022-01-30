
/* Update props of a DOM node if the props are different */
function updateProps(domNode, prevProps, newProps) {
    for (const [k, v] of Object.entries(newProps)) {
        if (prevProps[k] != v) {
            domNode[k] = v;
        }
    }
}


/**
 * Create an instance of a component that contains
 * the DOM node of the element, the element itself,
 * and child instances of it's child elements.
 */
function createInstance(domContainer, element) {
    const isDomNode = typeof element.type == "string";

    /* If the element represents a DOM node */
    if (isDomNode) {
        const domNode = element.type == "TEXT"
            ? document.createTextNode("")
            : document.createElement(element.type);
        
        updateProps(domNode, {}, element.props);
        
        const childInstance = [];
        
        /* Create instances of children */
        for (const child of element.children) {
            childInstance.push(createInstance(domNode, child));
        }

        for (const child of childInstance) {
            domNode.appendChild(child.domNode);
        }

        return { domNode, element, childInstance };
    }
    /* If the element represents a component */
    else {
        const componentInstance = new element.type(element.props);
        const childInstance = createInstance(domContainer, componentInstance.render());
        componentInstance.domNode = childInstance.domNode;
        componentInstance.element = element;
        componentInstance.childInstance = childInstance;
        return componentInstance;
    }
}


/* Reconcile the child instances of an elements that represents a DOM element */
function reconcileChildren(instance, element) {
    const newChildInstances = [];
    const count = Math.max(instance.childInstance.length, element.children.length);

    for (let i = 0; i < count; i++) {
        newChildInstances.push(reconcile(instance.domNode, instance.childInstance[i], element.children[i]));
    }

    return newChildInstances;
}


export function reconcile(domContainer, instance, element) {
    /* Initial render */
    if (instance == null) {
        const instance = createInstance(domContainer, element);
        domContainer.appendChild(instance.domNode);
        return instance;
    }
    else {
        if (element == null) {
            domContainer.removeChild(instance.domNode);
            return null;
        }
        /* If the element represents a DOM element */
        else if (typeof element.type == "string") {
            if (instance.element.type == element.type) {
                updateProps(instance.domNode, instance.element.props, element.props);
                instance.childInstance = reconcileChildren(instance, element);
                return instance;
            }
            else {
                instance.childInstance = reconcileChildren(instance, element);
                return instance;
            }
        }
        /**
         * If old element type != new element type,  
         * create new instance for the whole sub-tree 
         */ 
        else if (instance.element.type != element.type) {
            const newInstance = createInstance(element);
            parentDom.replaceChild(newInstance.domNode, instance.domNode);
            return newInstance;
        }
        /* If the element is a component */
        else {
            /**
             * OldChildInstance is the has the element tree with old state, 
             * reRenderedChildElement is the tree with newState.
             */
            const childInstance = reconcile(domContainer, instance.childInstance, instance.render());
            instance.domNode = childInstance.domNode;
            instance.childInstance = childInstance;
            return instance;
        }
    }
    
}
