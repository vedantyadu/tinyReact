import { reconcile } from "./reconcile.js";

/* Base component class */
export class Component {
    constructor(props) {
        this.props = props;
        this.state = null;
        this.domNode = null;
        this.element = null;
        this.childInstance = null;
    }
    /* Change the state of the component and reconcile */
    setState(partialState) {
        for (const [k, v] of Object.entries(partialState)) {
            this.state[k] = v;
        }
        reconcile(this.domNode.parentNode, this, this.element);
    }
}
