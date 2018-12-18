import * as React from 'react';
import { NodeModel } from '../../models/NodeModel';
import { BaseWidget, BaseWidgetProps } from '../../widgets/BaseWidget';

export interface TextPortProps extends BaseWidgetProps {
	name: string;
	isInput: boolean;
	node: NodeModel;
	portType: string;
}

export interface TextPortState {
	selected: boolean;
}

/**
 * @author Alen Štruklec
 */
export class TextPortWidget extends BaseWidget<TextPortProps, TextPortState> {
	constructor(props: TextPortProps) {
		super('srd-port', props);
		this.state = {
			selected: false
		};
	}

	getClassName() {
		return (
			'port ' +
			super.getClassName().slice(0, -1) +
			(this.props.isInput ? '-left' : '-right') +
			(this.props.portType === 'TIMEOUT' ? '-timeout' : '') +
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
