import * as React from "react";
import { TextPortModel } from "./TextPortModel";
import { PortWidget } from "../../widgets/PortWidget";
import { BaseWidget, BaseWidgetProps } from "../../widgets/BaseWidget";

export interface TextPortLabelProps extends BaseWidgetProps {
	model: TextPortModel;
}

export interface TextPortLabelState {}

/**
 * @author Alen Štruklec
 */
export class TextPortLabel extends BaseWidget<TextPortLabelProps, TextPortLabelState> {
	constructor(props) {
		super("srd-default-port", props);
	}

	getClassName() {
		return super.getClassName() + (this.props.model.in ? this.bem("--in") : this.bem("--out"));
	}

	render() {
		var port = <PortWidget node={this.props.model.getParent()} isInput={this.props.model.in} name={this.props.model.name}  />;
		var label = <div className="name">{this.props.model.label}</div>;
		var input = <input className="srd-input" defaultValue={this.props.model.label} onChange={(e)=>{
			this.props.model.label = e.currentTarget.value;
		}} ></input>;

		return (
			<div {...this.getProps()}>
				{this.props.model.in ? port : input}
				{this.props.model.in ? input : port}
			</div>
		);
	}
}
