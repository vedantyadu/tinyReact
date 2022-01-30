# tinyReact
A simple version of Reactjs with support for components and state.  

#### Creating an element ####
```js
tinyReact.createElement("div", {className: "example-div"}, ["hello world"]);
```

#### Creating a component ####
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
  
#### Mounting a component ####
```js
tinyReact.mount(tinyReact.createElement(App), document.querySelector("#root"));
```
