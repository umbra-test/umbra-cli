import { StartupContext, Partialize } from "./StartupContext";
import { UmbraConfig } from "../Config/UmbraConfig";
declare const CreateContext: (config: UmbraConfig) => Partialize<StartupContext, "config">;
export { CreateContext };
