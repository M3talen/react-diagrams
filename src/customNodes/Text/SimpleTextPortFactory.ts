import { TextPortModel } from "./TextPortModel";
import { AbstractPortFactory } from "../../factories/AbstractPortFactory";
/**
 * @author Alen Štruklec
 */
export class SimpleTextPortFactory extends AbstractPortFactory<TextPortModel> {
	constructor() {
		super("text");
	}

	getNewInstance(initialConfig?: any): TextPortModel {
		return new TextPortModel("INPUT", "unknown");
	}
}
