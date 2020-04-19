import {StartupContext} from "./StartupContext";

const CreateContext = (config: UmbraConfig): Partial<StartupContext> => {
    return {
        config: config
    }
};

export {CreateContext};
