class FontChooser extends React.Component {

    constructor(props) {
	super(props);
	this.formRef = React.createRef();
    }
    toggleFormElements() {
	const formRef = this.formRef.current;
	if (formRef.hidden)
	    formRef.hidden = false;
	else
	    formRef.hidden = true;
    }

    render() {
	return(
		<div>
		<span ref={this.formRef} hidden={true}>
		<input type="checkbox" id="boldCheckbox"/>
		<button id="decreaseButton">-</button>
		<span id="fontSizeSpan">{this.props.size}</span>
		<button id="increaseButton">+</button>
		</span>
		<span id="textSpan" onClick={this.toggleFormElements.bind(this)}>{this.props.text}</span>
	       </div>
	);
    }
}

