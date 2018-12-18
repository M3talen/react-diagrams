import { DelayPortModel } from "./DelayPortModel";
import { AbstractPortFactory } from "../../factories/AbstractPortFactory";
/**
 * @author Alen Štruklec
 */
export class DelayPortFactory extends AbstractPortFactory<DelayPortModel> {
	constructor() {
		super("delay");
	}

	getNewInstance(initialConfig?: any): DelayPortModel {
		return new DelayPortModel("INPUT", "unknown");
	}
}
