import * as React from 'react';
import * as _ from 'lodash';
import { DelayNodeModel } from './DelayNodeModel';
import { DelayPortLabel } from './DelayPortLabel';
import { DiagramEngine } from '../../DiagramEngine';
import { BaseWidget, BaseWidgetProps } from '../../widgets/BaseWidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus, faClock } from '@fortawesome/free-solid-svg-icons';
export interface DelayNodeProps extends BaseWidgetProps {
	node: DelayNodeModel;
	diagramEngine: DiagramEngine;
}

export interface DelayNodeState {}

/**
 * @author Alen Štruklec
 */
export class DelayNodeWidget extends BaseWidget<DelayNodeProps, DelayNodeState> {
	constructor(props: DelayNodeProps) {
		super('srd-delay-node', props);
		this.state = {};
	}

	generatePort(port) {
		return <DelayPortLabel model={port} key={port.id} />;
	}

	setOutput = (val) => {
		this.props.node.delayTime = val;
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
					<a>
						Wait for{' '}
					</a>
					<input
						type="number"
						className={this.bem('__input')}
						defaultValue={this.props.node.delayTime}
						onChange={(e) => {
							this.setOutput(e.currentTarget.value);
						}}
					/>
					<a>ms </a>
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
