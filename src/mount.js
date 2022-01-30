import { reconcile } from "./reconcile.js";

/* Render a component to a DOM container */
export function mount(element, domContainer) {
    reconcile(domContainer, null, element);
}
