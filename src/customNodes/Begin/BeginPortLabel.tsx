import * as React from 'react';
import { BeginPortModel } from './BeginPortModel';
import { BeginPortWidget } from './BeginPortWidget';
import { BaseWidget, BaseWidgetProps } from '../../widgets/BaseWidget';

export interface BeginPortLabelProps extends BaseWidgetProps {
	model: BeginPortModel;
}

export interface BeginPortLabelState {}

/**
 * @author Alen Štruklec
 */
export class BeginPortLabel extends BaseWidget<BeginPortLabelProps, BeginPortLabelState> {
	constructor(props) {
		super('srd-default-port', props);
	}

	getClassName() {
		if (this.props.model.portType === 'INPUT') return super.getClassName() + this.bem('--in');
		else if (this.props.model.portType === 'OUTPUT') return super.getClassName() + this.bem('--out');
	}

	render() {
		var port = (
			<BeginPortWidget
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
