import { EndPortModel } from "./EndPortModel";
import * as _ from "lodash";
import { NodeModel } from "../../models/NodeModel";
import { Toolkit } from "../../Toolkit";
import { DiagramEngine } from "../../DiagramEngine";
import { log } from "util";

/**
 * @author Alen Štruklec
 */
export class EndNodeModel extends NodeModel {
	name: string;
	EndTime: string;
	color: string;
	ports: { [s: string]: EndPortModel };

	constructor(name: string = "Untitled", color: string = "rgb(0,192,255)") {
		super("End");
		this.name = name;
		this.color = color;
	}

	addInPort(label: string): EndPortModel {
		return this.addPort(new EndPortModel("INPUT", Toolkit.UID(), label));
	}

	addOutPort(label: string): EndPortModel {
		return this.addPort(new EndPortModel("OUTPUT", Toolkit.UID(), label));
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.name = object.name;
		this.EndTime = object.EndTime;
		this.color = object.color;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
			EndTime: this.EndTime,
			color: this.color
		});
	}

	getInPorts(): EndPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.portType === "INPUT";
		});
	}

	getOutPorts(): EndPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.portType === "OUTPUT";
		});
	}

}
