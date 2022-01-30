import { tinyReact } from "./src/tinyReact.js";


class Clicker extends tinyReact.Component {
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


class InputComp extends tinyReact.Component {
    constructor(props) {
        super(props);
        this.state = {curText: "This text reacts"};
        this.changeText = (event) => {
            this.setState({curText: event.target.value});
        }
    }
    render() {
        return (
            tinyReact.createElement("div", {className: "reactive-input"}, [
                tinyReact.createElement("input", {
                    id:"input", value:this.state.curText, onkeyup: this.changeText, autocomplete:"off"
                }),
                tinyReact.createElement("p", {}, [this.state.curText])
            ])
        );
    }
}


class App extends tinyReact.Component {
    constructor(props) {
        super(props);
        this.state = {clickers: 0};
        this.add = () => {
            this.setState({clickers: this.state.clickers + 1});
        }
    }

    render() {

        const clickers = [
            tinyReact.createElement(InputComp),
            tinyReact.createElement("button", {onclick: this.add}, ["New clicker"])
        ];

        for (let i = 0; i < this.state.clickers; i++) {
            clickers.push(tinyReact.createElement(Clicker));
        }

        return (
            tinyReact.createElement("div", {className: "app"}, clickers)
        );
    }
}


tinyReact.mount(tinyReact.createElement(App), document.querySelector("#root"));
