import * as React from 'react';
import * as _ from 'lodash';
import { BeginNodeModel } from './BeginNodeModel';
import { BeginPortLabel } from './BeginPortLabel';
import { DiagramEngine } from '../../DiagramEngine';
import { BaseWidget, BaseWidgetProps } from '../../widgets/BaseWidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus, faClock } from '@fortawesome/free-solid-svg-icons';
export interface BeginNodeProps extends BaseWidgetProps {
	node: BeginNodeModel;
	diagramEngine: DiagramEngine;
}

export interface BeginNodeState {}

/**
 * @author Alen Štruklec
 */
export class BeginNodeWidget extends BaseWidget<BeginNodeProps, BeginNodeState> {
	constructor(props: BeginNodeProps) {
		super('srd-begin-node', props);
		this.state = {};
	}

	generatePort(port) {
		return <BeginPortLabel model={port} key={port.id} />;
	}

	setOutput = (val) => {
		this.props.node.BeginTime = val;
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
					<a style={{ color: 'white' }}>Accept incomming chat request</a>
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
