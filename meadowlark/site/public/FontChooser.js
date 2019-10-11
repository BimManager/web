class FontChooser extends React.Component {
    constructor(props) {
	super(props);
	this.formRef = React.createRef();
	this.checkboxRef = React.createRef();
	this.textRef = React.createRef();
	console.log(this.props.bold);
	this.state = { fontWeight: (this.props.bold == "true" ? "bold" : "normal"), size: parseInt(this.props.size, 10) };
    }
    toggleFormElements() {
	const formRef = this.formRef.current;
	if (formRef.hidden)
	    formRef.hidden = false;
	else
	    formRef.hidden = true;
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
	this.setState({size: this.state.size + 1 });
    }
    
    decrementFontSize() {
	this.setState({size: this.state.size - 1 });
    }

    render() {
	return(
		<div>
		<span ref={this.formRef} hidden={true}>
		<input type="checkbox" id="boldCheckbox" ref={this.checkboxRef} onClick={this.toggleBoldness.bind(this)}/>
		<button id="decreaseButton" onClick={this.decrementFontSize.bind(this)}>-</button>
		<span id="sizeSpan">{this.state.size}</span>
		<button id="increaseButton" onClick={this.incrementFontSize.bind(this)}>+</button>
		</span>
		<span id="textSpan" ref={this.textRef}
	    style={{fontSize: this.state.size, fontWeight: this.state.fontWeight}}
	    onClick={this.toggleFormElements.bind(this)}>{this.props.text}</span>
	       </div>
	);
    }
}

