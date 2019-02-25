import { BeginPortModel } from "./BeginPortModel";
import { AbstractPortFactory } from "../../factories/AbstractPortFactory";
/**
 * @author Alen Štruklec
 */
export class BeginPortFactory extends AbstractPortFactory<BeginPortModel> {
	constructor() {
		super("begin");
	}

	getNewInstance(initialConfig?: any): BeginPortModel {
		return new BeginPortModel("INPUT", "unknown");
	}
}
