import { DelayPortModel } from "./DelayPortModel";
import * as _ from "lodash";
import { NodeModel } from "../../models/NodeModel";
import { Toolkit } from "../../Toolkit";
import { DiagramEngine } from "../../DiagramEngine";
import { log } from "util";

/**
 * @author Alen Štruklec
 */
export class DelayNodeModel extends NodeModel {
	name: string;
	delayTime: string;
	color: string;
	ports: { [s: string]: DelayPortModel };

	constructor(name: string = "Untitled", delayTime: string = "", color: string = "rgb(0,192,255)") {
		super("delay");
		this.name = name;
		this.delayTime = delayTime;
		this.color = color;
	}

	addInPort(label: string): DelayPortModel {
		return this.addPort(new DelayPortModel("INPUT", Toolkit.UID(), label));
	}

	addOutPort(label: string): DelayPortModel {
		return this.addPort(new DelayPortModel("OUTPUT", Toolkit.UID(), label));
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.name = object.name;
		this.delayTime = object.delayTime;
		this.color = object.color;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
			delayTime: this.delayTime,
			color: this.color
		});
	}

	getInPorts(): DelayPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.portType === "INPUT";
		});
	}

	getOutPorts(): DelayPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.portType === "OUTPUT";
		});
	}

}
