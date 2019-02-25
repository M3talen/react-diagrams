import * as SRD from 'storm-react-diagrams';
import { BeginNodeWidget } from './BeginNodeWidget';
import { BeginNodeModel } from './BeginNodeModel';
import * as React from 'react';
import { AbstractNodeFactory } from '../../factories/AbstractNodeFactory';
import { DiagramEngine } from '../../DiagramEngine';

/**
 * @author Alen Štruklec
 */
export class BeginNodeFactory extends AbstractNodeFactory<BeginNodeModel> {
	constructor() {
		super('begin');
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: BeginNodeModel): JSX.Element {
		return React.createElement(BeginNodeWidget, {
			node: node,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig?: any): BeginNodeModel {
		return new BeginNodeModel();
	}
}
