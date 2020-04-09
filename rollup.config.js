import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import builtins from "builtin-modules";
import commonjs from "@rollup/plugin-commonjs";

export default [{
    input: "lib/index.js",
    external: [...builtins, "argparse"],
    output: [{
        file: "lib/index.cjs.js",
        format: "cjs",
        interop: false,
        sourcemap: true,
        banner: "#!/usr/bin/env node"
    }, {
        file: "lib/index.esm.js",
        format: "es",
        sourcemap: true,
        banner: "#!/usr/bin/env node"
    }],
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        commonjs(),
        terser()
    ]
}];
