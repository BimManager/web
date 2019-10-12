class FontChooser extends React.Component {
    constructor(props) {
	super(props);
	this.formRef = React.createRef();
	this.checkboxRef = React.createRef();
	localStorage.setItem("initialFontSize", this.props.size);
	console.log(this.props.bold);
	this.state = { fontColor: "black",
	    fontWeight: this.props.bold == "true" ? "bold" : "normal",
		       fontSize: parseInt(this.props.size, 10) };
    }
    toggleFormElements() {
	const formRef = this.formRef.current;
	const checkboxRef = this.checkboxRef.current;
	if (formRef.hidden)
	    formRef.hidden = false;
	else
	    formRef.hidden = true;
	if (this.state.fontWeight = "bold")
	    checkboxRef.checked = true;
    }
    
    toggleBoldness() {
	const checkboxRef = this.checkboxRef.current;
	if (checkboxRef.checked) {
	    this.setState({fontWeight: "bold"});
	} else {
	    this.setState({fontWeight: "normal"});
	}
    }
    
    incrementFontSize() {
	if (this.state.fontSize == this.props.max) {
	    return ;
	} else if (this.state.fontSize == this.props.max - 1) {
	    this.setState({fontColor: "red"});
	} else if (this.state.fontColor == "red") {
	    this.setState({fontColor: "black"});
	}
	this.setState({fontSize: this.state.fontSize + 1 });
    }
    componentDidUpdate() {
	console.log(this.state.fontSize);
    }
    
    decrementFontSize() {
	if (this.state.fontSize == this.props.min) {
	    return ;
	} else if (this.state.fontSize - 1 == this.props.min) {
	    this.setState({fontColor: "red"});
	}
	else if (this.state.fontColor == "red") {
	    this.setState({fontColor: "black"});
	}
	this.setState({fontSize: this.state.fontSize - 1 });
    }

    restoreDefaultValues() {
	const initialFontSize = parseInt(localStorage.getItem("initialFontSize"));
	this.setState({ fontSize: initialFontSize });
	this.setState({ fontColor: "black" });
    }

    render() {
	return(
		<div>
		<span ref={this.formRef} hidden={true}>
		<input type="checkbox" id="boldCheckbox" ref={this.checkboxRef} onClick={this.toggleBoldness.bind(this)}/>
		<button id="decreaseButton" onClick={this.decrementFontSize.bind(this)}>-</button>
		<span id="sizeSpan">{this.state.fontSize}</span>
		<button id="increaseButton" onClick={this.incrementFontSize.bind(this)}>+</button>
		</span>
		<span id="textSpan" ref={this.textRef}
	    style={{color: this.state.fontColor, fontSize: this.state.fontSize, fontWeight: this.state.fontWeight}}
	    onClick={this.toggleFormElements.bind(this)}
	    onDoubleClick={this.restoreDefaultValues.bind(this)}>
		{this.props.text}
	    </span>
	       </div>
	);
    }
}

