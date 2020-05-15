import { StartupContext, Partialize } from "./StartupContext";
declare const CreateRunner: (context: Partialize<StartupContext, "config">) => Partialize<StartupContext, "config" | "runner">;
export { CreateRunner };
