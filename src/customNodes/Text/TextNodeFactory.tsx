import * as SRD from 'storm-react-diagrams';
import { TextNodeWidget } from './TextNodeWidget';
import { TextNodeModel } from './TextNodeModel';
import * as React from 'react';
import { AbstractNodeFactory } from '../../factories/AbstractNodeFactory';
import { DiagramEngine } from '../../DiagramEngine';

/**
 * @author Alen Štruklec
 */
export class TextNodeFactory extends AbstractNodeFactory<TextNodeModel> {
	constructor() {
		super('text');
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: TextNodeModel): JSX.Element {
		return React.createElement(TextNodeWidget, {
			node: node,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig?: any): TextNodeModel {
		return new TextNodeModel();
	}
}
