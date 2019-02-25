import * as React from 'react';
import * as _ from 'lodash';
import { EndNodeModel } from './EndNodeModel';
import { EndPortLabel } from './EndPortLabel';
import { DiagramEngine } from '../../DiagramEngine';
import { BaseWidget, BaseWidgetProps } from '../../widgets/BaseWidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus, faClock } from '@fortawesome/free-solid-svg-icons';
export interface EndNodeProps extends BaseWidgetProps {
	node: EndNodeModel;
	diagramEngine: DiagramEngine;
}

export interface EndNodeState {}

/**
 * @author Alen Štruklec
 */
export class EndNodeWidget extends BaseWidget<EndNodeProps, EndNodeState> {
	constructor(props: EndNodeProps) {
		super('srd-End-node', props);
		this.state = {};
	}

	generatePort(port) {
		return <EndPortLabel model={port} key={port.id} />;
	}

	setOutput = (val) => {
		this.props.node.EndTime = val;
	};

	render() {
		return (
			<div {...this.getProps()} style={{ background: this.props.node.color }}>
				<div className={this.bem('__title')}>
					<div className={this.bem('__name')}>{this.props.node.name}</div>

					<a
						className={this.bem('__close')}
						onClick={() => {
							this.props.node.remove();
							this.props.diagramEngine.repaintCanvas();
						}}
					>
						<FontAwesomeIcon icon={faTimes} size="xs" />
					</a>
				</div>
				<div className={this.bem('__body')}>
					<a style={{ color: 'white' }}> End conversation </a>
				</div>
				<div className={this.bem('__ports')}>
					<div className={this.bem('__in')}>
						{_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
					</div>
					<div className={this.bem('__out')}>
						{_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
					</div>
				</div>
				<div className={this.bem('__footer')}>
					<br />
				</div>
			</div>
		);
	}
}
