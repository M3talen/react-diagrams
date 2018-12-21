import * as React from 'react';
import * as _ from 'lodash';
import { TextNodeModel } from './TextNodeModel';
import { TextPortLabel } from './TextPortLabel';
import { DiagramEngine } from '../../DiagramEngine';
import { BaseWidget, BaseWidgetProps } from '../../widgets/BaseWidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-responsive-modal';
import ResizableTextArea from 'react-resizable-textarea';
import { basename } from 'path';

export interface TextNodeProps extends BaseWidgetProps {
	node: TextNodeModel;
	diagramEngine: DiagramEngine;
}

export interface TextNodeState {
	open: boolean;
	output: string;
}

/**
 * @author Alen Štruklec
 */
export class TextNodeWidget extends BaseWidget<TextNodeProps, TextNodeState> {
	constructor(props: TextNodeProps) {
		super('srd-text-node', props);
		this.state = {
			open: false,
			output: props.node.output
		};
	}

	generatePort(port) {
		return <TextPortLabel model={port} key={port.id} />;
	}

	setOutput = (val) => {
		this.props.node.output = val;
		this.setState({output:val})
	};
	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
		this.forceUpdate();
	};

	render() {
		const { open } = this.state;
		return (
			<div {...this.getProps()} style={{ background: this.props.node.color }}>
				<Modal
					showCloseIcon={false}
					classNames={{
						overlay: this.bem('__cO'),
						modal: this.bem('__cM')
					}}
					open={open}
					onClose={this.onCloseModal}
					center
				>
					<ResizableTextArea
						
						className={this.bem('__inputBlack')}
						type="text"
						minWidth={280} // Minimum width in px
						minHeight={225} // Minimum height in px
						value={this.state.output}
						onChange={(e) => {
							this.setOutput(e.target.value);
						}}
					/>
					<button className={this.bem('__button')} onClick={this.onCloseModal}>Close</button>
				</Modal>
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
					<label
						className={this.bem('__input')}
						onClick={(e) => {
							this.onOpenModal();
						}}
					>{this.state.output.length < 23 ? this.state.output : (this.state.output.slice(0,20) + '...')}
					</label>
				</div>
				<div className={this.bem('__ports')}>
					<div className={this.bem('__in')}>
						{_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
					</div>
					<div className={this.bem('__out')}>
						<div className={this.bem('__timeout')}>
							{_.map(this.props.node.getTimeoutPorts(), this.generatePort.bind(this))}
						</div>
						{_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
					</div>
				</div>
				<div className={this.bem('__footer')}>
					<div className={this.bem('__inPortsMenu')}>
						<a
							className={this.bem('__close')}
							onClick={() => {
								this.props.node.removePort(this.props.node.getInPorts().slice(-1)[0]);
								this.props.diagramEngine.repaintCanvas();
							}}
						>
							<FontAwesomeIcon icon={faMinus} size="xs" />
						</a>
						<a
							className={this.bem('__close')}
							onClick={() => {
								this.props.node.addInPort(' ');
								this.props.diagramEngine.repaintCanvas();
							}}
						>
							<FontAwesomeIcon icon={faPlus} size="xs" />
						</a>
					</div>
					<div className={this.bem('__outPortsMenu')}>
						<a
							className={this.bem('__close')}
							onClick={() => {
								this.props.node.removePort(this.props.node.getOutPorts().slice(-1)[0]);
								this.props.diagramEngine.repaintCanvas();
							}}
						>
							<FontAwesomeIcon icon={faMinus} size="xs" />
						</a>
						<a
							className={this.bem('__close')}
							onClick={() => {
								this.props.node.addOutPort(' ');
								this.props.diagramEngine.repaintCanvas();
							}}
						>
							<FontAwesomeIcon icon={faPlus} size="xs" />
						</a>
					</div>
				</div>
			</div>
		);
	}
}
