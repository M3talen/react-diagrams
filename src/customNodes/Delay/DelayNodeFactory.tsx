import * as SRD from 'storm-react-diagrams';
import { DelayNodeWidget } from './DelayNodeWidget';
import { DelayNodeModel } from './DelayNodeModel';
import * as React from 'react';
import { AbstractNodeFactory } from '../../factories/AbstractNodeFactory';
import { DiagramEngine } from '../../DiagramEngine';

/**
 * @author Alen Štruklec
 */
export class DelayNodeFactory extends AbstractNodeFactory<DelayNodeModel> {
	constructor() {
		super('delay');
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: DelayNodeModel): JSX.Element {
		return React.createElement(DelayNodeWidget, {
			node: node,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig?: any): DelayNodeModel {
		return new DelayNodeModel();
	}
}
