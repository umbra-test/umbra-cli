import { StartupContext } from "./StartupContext";
import { UmbraConfig } from "../Config/UmbraConfig";
declare const CreateContext: (config: UmbraConfig) => Partial<StartupContext>;
export { CreateContext };
