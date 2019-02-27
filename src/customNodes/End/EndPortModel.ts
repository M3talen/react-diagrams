import * as _ from 'lodash';
import { PortModel } from '../../models/PortModel';
import { DiagramEngine } from '../../DiagramEngine';
import { DefaultLinkModel } from '../../defaults/models/DefaultLinkModel';
import { LinkModel } from '../../models/LinkModel';

/**
 * @author Alen Štruklec
 */
export class EndPortModel extends PortModel {
	in: boolean;
	label: string;
	portType: string;
	links: { [id: string]: DefaultLinkModel };

	constructor(portType: string, name: string, label: string = null, id?: string) {
		super(name, 'End', id, portType == "INPUT" ? true : false);
		this.in = portType == "INPUT" ? true : false;
		this.label = label || name;
		this.portType = portType;
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.in = object.in;
		this.label = object.label;
		this.portType = object.portType;
	}

	serialize() {
		return _.merge(super.serialize(), {
			in: this.in,
			label: this.label,
			portType: this.portType
		});
	}

	link(port: PortModel): LinkModel {
		let link = this.createLinkModel();
		if(this.in){
			link.setSourcePort(port);
			link.setTargetPort(this);
		}else{
			link.setSourcePort(this);
			link.setTargetPort(port);
		}
		return link;
	}

	canLinkToPort(port: PortModel): boolean {
		if (port instanceof EndPortModel) {
			return this.in !== port.in;
		}
		return true;
	}

	createLinkModel(): LinkModel {
		let link = super.createLinkModel();
		return link || new DefaultLinkModel();
	}
}
