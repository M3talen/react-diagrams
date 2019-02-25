import { BeginPortModel } from "./BeginPortModel";
import * as _ from "lodash";
import { NodeModel } from "../../models/NodeModel";
import { Toolkit } from "../../Toolkit";
import { DiagramEngine } from "../../DiagramEngine";
import { log } from "util";

/**
 * @author Alen Štruklec
 */
export class BeginNodeModel extends NodeModel {
	name: string;
	BeginTime: string;
	color: string;
	ports: { [s: string]: BeginPortModel };

	constructor(name: string = "Untitled", color: string = "rgb(0,192,255)") {
		super("begin");
		this.name = name;
		this.color = color;
	}

	addInPort(label: string): BeginPortModel {
		return this.addPort(new BeginPortModel("INPUT", Toolkit.UID(), label));
	}

	addOutPort(label: string): BeginPortModel {
		return this.addPort(new BeginPortModel("OUTPUT", Toolkit.UID(), label));
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.name = object.name;
		this.BeginTime = object.BeginTime;
		this.color = object.color;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
			BeginTime: this.BeginTime,
			color: this.color
		});
	}

	getInPorts(): BeginPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.portType === "INPUT";
		});
	}

	getOutPorts(): BeginPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.portType === "OUTPUT";
		});
	}

}
