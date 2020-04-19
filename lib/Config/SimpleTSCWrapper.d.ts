/// <reference types="node" />
import { spawn } from "child_process";
declare class SimpleTSCWrapper {
    private readonly spawnRef;
    constructor(spawnRef?: typeof spawn);
    spawn(inFile: string, outFile: string): Promise<void>;
}
export { SimpleTSCWrapper };
