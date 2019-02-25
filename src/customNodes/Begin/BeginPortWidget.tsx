import * as React from 'react';
import { NodeModel } from '../../models/NodeModel';
import { BaseWidget, BaseWidgetProps } from '../../widgets/BaseWidget';

export interface BeginPortProps extends BaseWidgetProps {
	name: string;
	isInput: boolean;
	node: NodeModel;
	portType: string;
}

export interface BeginPortState {
	selected: boolean;
}

/**
 * @author Alen Štruklec
 */
export class BeginPortWidget extends BaseWidget<BeginPortProps, BeginPortState> {
	constructor(props: BeginPortProps) {
		super('srd-port', props);
		this.state = {
			selected: false
		};
	}

	getClassName() {
		return (
			'port ' +
			super.getClassName().slice(0, -1) +
			(this.props.isInput ? '-left-timeout' : '-right') +
			(this.state.selected ? ' --selected' : '')
		);
	}

	render() {
		return (
			<div
				{...this.getProps()}
				onMouseEnter={() => {
					this.setState({ selected: true });
				}}
				onMouseLeave={() => {
					this.setState({ selected: false });
				}}
				data-name={this.props.name}
				data-nodeid={this.props.node.getID()}
			/>
		);
	}
}
