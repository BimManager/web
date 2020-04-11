class FontChooser extends React.Component {
    constructor(props) {
	super(props);
	this.formRef = React.createRef();
	this.checkboxRef = React.createRef();
	this.state = { fontColor: "black",
		       fontWeight: this.props.bold == "true" ? "bold" : "normal",
		     };
	this.errorHandling();
	localStorage.setItem("initialFontSize", this.fontSize);
    }
    errorHandling() {
	let min = parseInt(this.props.min);
	let max = parseInt(this.props.max);
	let size = parseInt(this.props.size);
	
	min = min <= 0 ? 1 : min;
	max = max <= 0 ? 1 : max;
	if (min > max) {
	    let tmp = min;
	    min = max;
	    max = min;
	}
	if (size < min) {
	    size = min;
	}
	if (size > max) {
	    size = max;
	}
	this.state.fontSizeMin = min;
	this.state.fontSizeMax = max;
	this.state.fontSize = size;
    }

    componentDidMount() {
	console.log(`min = ${this.state.fontSizeMin}`);
	console.log(`max = ${this.state.fontSizeMax}`);
	console.log(`size = ${this.state.fontSize}`);
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
	if (this.state.fontSize == this.state.fontSizeMax) {
	    return ;
	} else if (this.state.fontSize == this.state.fontSizeMax - 1) {
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
	if (this.state.fontSize == this.state.fontSizeMin) {
	    return ;
	} else if (this.state.fontSize - 1 == this.state.fontSizeMin) {
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

