import { TextPortModel } from "./TextPortModel";
import * as _ from "lodash";
import { NodeModel } from "../../models/NodeModel";
import { Toolkit } from "../../Toolkit";
import { DiagramEngine } from "../../DiagramEngine";
import { log } from "util";

/**
 * @author Alen Štruklec
 */
export class TextNodeModel extends NodeModel {
	name: string;
	output: string;
	color: string;
	ports: { [s: string]: TextPortModel };

	constructor(name: string = "Untitled", output: string = "", color: string = "rgb(0,192,255)") {
		super("text");
		this.name = name;
		this.output = output;
		this.color = color;
	}

	addInPort(label: string): TextPortModel {
		return this.addPort(new TextPortModel("INPUT", Toolkit.UID(), label));
	}

	addOutPort(label: string): TextPortModel {
		return this.addPort(new TextPortModel("OUTPUT", Toolkit.UID(), label));
	}

	addTimeoutPort(label: string): TextPortModel {
		return this.addPort(new TextPortModel("TIMEOUT", Toolkit.UID(), label));
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.name = object.name;
		this.output = object.output;
		this.color = object.color;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
			output: this.output,
			color: this.color
		});
	}

	getInPorts(): TextPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.portType === "INPUT";
		});
	}

	getTimeoutPorts(): TextPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.portType === "TIMEOUT";
		});
	}

	getOutPorts(): TextPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.portType === "OUTPUT";
		});
	}

}
