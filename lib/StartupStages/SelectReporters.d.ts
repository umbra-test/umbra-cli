import { StartupContext, Partialize } from "./StartupContext";
declare const SelectReporters: (context: Partialize<StartupContext, "config" | "runner">) => StartupContext;
export { SelectReporters };
