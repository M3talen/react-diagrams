import * as React from 'react';
import { DelayPortModel } from './DelayPortModel';
import { DelayPortWidget } from './DelayPortWidget';
import { BaseWidget, BaseWidgetProps } from '../../widgets/BaseWidget';

export interface DelayPortLabelProps extends BaseWidgetProps {
	model: DelayPortModel;
}

export interface DelayPortLabelState {}

/**
 * @author Alen Štruklec
 */
export class DelayPortLabel extends BaseWidget<DelayPortLabelProps, DelayPortLabelState> {
	constructor(props) {
		super('srd-default-port', props);
	}

	getClassName() {
		if (this.props.model.portType === 'INPUT') return super.getClassName() + this.bem('--in');
		else if (this.props.model.portType === 'OUTPUT') return super.getClassName() + this.bem('--out');
	}

	render() {
		var port = (
			<DelayPortWidget
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
				{this.props.model.in ? port : label}
				{this.props.model.in ? label : port}
			</div>
		);
	}
}
