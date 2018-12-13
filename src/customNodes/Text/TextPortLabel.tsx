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
		var port = <PortWidget node={this.props.model.getParent()} name={this.props.model.name} />;
		var label = <div className="name">{this.props.model.label}</div>;

		return (
			<div {...this.getProps()}>
				{this.props.model.in ? port : label}
				{this.props.model.in ? label : port}
			</div>
		);
	}
}
