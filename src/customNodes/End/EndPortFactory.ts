import { EndPortModel } from "./EndPortModel";
import { AbstractPortFactory } from "../../factories/AbstractPortFactory";
/**
 * @author Alen Štruklec
 */
export class EndPortFactory extends AbstractPortFactory<EndPortModel> {
	constructor() {
		super("End");
	}

	getNewInstance(initialConfig?: any): EndPortModel {
		return new EndPortModel("INPUT", "unknown");
	}
}
