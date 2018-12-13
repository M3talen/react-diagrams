import * as React from "react";
import * as _ from "lodash";
import { TextNodeModel } from "./TextNodeModel";
import { TextPortLabel } from "./TextPortLabel";
import { DiagramEngine } from "../../DiagramEngine";
import { BaseWidget, BaseWidgetProps } from "../../widgets/BaseWidget";

export interface TextNodeProps extends BaseWidgetProps {
	node: TextNodeModel;
	diagramEngine: DiagramEngine;
}

export interface TextNodeState {}

/**
 * @author Alen Štruklec
 */
export class TextNodeWidget extends BaseWidget<TextNodeProps, TextNodeState> {
	constructor(props: TextNodeProps) {
		super("srd-text-node", props);
		this.state = {};
	}

	generatePort(port) {
		return <TextPortLabel model={port} key={port.id} />;
	}

	setOutput = (val) => {
		this.props.node.output = val;
	}

	render() {
		return (
			<div {...this.getProps()} style={{ background: this.props.node.color }}>
				<div className={this.bem("__title")}>
					<div className={this.bem("__name")}>{this.props.node.name}</div>
					
				</div>
				<div className={this.bem("__body")}>
					<input type="text" className={this.bem("__input")} defaultValue={this.props.node.output} onChange={(e)=>{
						this.setOutput(e.currentTarget.value)
					}} />
				</div>
				<div className={this.bem("__ports")}>
					<div className={this.bem("__in")}>
						{_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
					</div>
					<div className={this.bem("__out")}>
						{_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
					</div>
				</div>
			</div>
		);
	}
}
