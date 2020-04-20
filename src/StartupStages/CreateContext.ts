import {StartupContext} from "./StartupContext";
import {UmbraConfig} from "../Config/UmbraConfig";

const CreateContext = (config: UmbraConfig): Partial<StartupContext> => {
    return {
        config: config
    }
};

export {CreateContext};
