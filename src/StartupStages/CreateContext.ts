import {StartupContext, Partialize} from "./StartupContext";
import {UmbraConfig} from "../Config/UmbraConfig";

const CreateContext = (config: UmbraConfig): Partialize<StartupContext, "config"> => {
    return {
        config: config
    }
};

export {CreateContext};
