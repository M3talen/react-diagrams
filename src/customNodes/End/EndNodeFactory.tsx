import * as SRD from 'storm-react-diagrams';
import { EndNodeWidget } from './EndNodeWidget';
import { EndNodeModel } from './EndNodeModel';
import * as React from 'react';
import { AbstractNodeFactory } from '../../factories/AbstractNodeFactory';
import { DiagramEngine } from '../../DiagramEngine';

/**
 * @author Alen Štruklec
 */
export class EndNodeFactory extends AbstractNodeFactory<EndNodeModel> {
	constructor() {
		super('End');
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: EndNodeModel): JSX.Element {
		return React.createElement(EndNodeWidget, {
			node: node,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig?: any): EndNodeModel {
		return new EndNodeModel();
	}
}
