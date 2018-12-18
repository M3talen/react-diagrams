import * as React from 'react';
import { TextPortModel } from './TextPortModel';
import { TextPortWidget } from './TextPortWidget';
import { BaseWidget, BaseWidgetProps } from '../../widgets/BaseWidget';

export interface TextPortLabelProps extends BaseWidgetProps {
	model: TextPortModel;
}

export interface TextPortLabelState {}

/**
 * @author Alen Štruklec
 */
export class TextPortLabel extends BaseWidget<TextPortLabelProps, TextPortLabelState> {
	constructor(props) {
		super('srd-default-port', props);
	}

	getClassName() {
		if (this.props.model.portType === 'INPUT') return super.getClassName() + this.bem('--in');
		else if (this.props.model.portType === 'OUTPUT') return super.getClassName() + this.bem('--out');
		else if (this.props.model.portType === 'TIMEOUT') return super.getClassName() + this.bem('--timeout');
	}

	render() {
		var port = (
			<TextPortWidget
				node={this.props.model.getParent()}
				isInput={this.props.model.in}
				name={this.props.model.name}
				portType={this.props.model.portType}
			/>
		);
		var label = <div className="name">{this.props.model.label}</div>;
		var input = (
			<input
				className="srd-input"
				defaultValue={this.props.model.label}
				disabled={this.props.model.portType === "TIMEOUT"}
				onChange={(e) => {
					this.props.model.label = e.currentTarget.value;
				}}
			/>
		);

		return (
			<div {...this.getProps()}>
				{this.props.model.in ? port : input}
				{this.props.model.in ? null : port}
			</div>
		);
	}
}
