# tinyReact
A simple version of Reactjs with support for components and state.  

  
Demo 👉 https://vedantyadu.github.io/tinyReact/
  
  

## Creating an element ##
An element can be a Component class or an HTML tag.  
Props include className, id, onclick etc.  
Children can be string or other elements.
```js
tinyReact.createElement("div", {className: "example-div"}, ["hello world"]);
```

## Creating a component ##
Components are very similar to react components, the only difference is there is no JSX.  
So, you have to manually return an element in the render method.
```js
class App extends tinyReact.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.inc = () => {
            this.setState({count: this.state.count + 1});
        }
    }
    render() {
        return (
            tinyReact.createElement("div", {className: "clicker-div"}, [
                tinyReact.createElement("p", {className: "click-count"}, [`${this.state.count}`]),
                tinyReact.createElement("button", {className: "click-button", onclick: this.inc}, ["+"])
            ])
        );
    }
}
```
  
## Mounting a component ##
The first argument is a tinyReact element, the second argument is an HTML element.
```js
tinyReact.mount(tinyReact.createElement(App), document.querySelector("#root"));
```
