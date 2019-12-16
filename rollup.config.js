import {terser} from "rollup-plugin-terser";

export default [{
    input: "lib/index.js",
    external: ["child_process", "path", "fast-glob", "fs", "umbra-test-runner", "argparse"],
    output: [{
        file: "lib/index.cjs.js",
        format: "cjs",
        interop: false
    }, {
        file: "lib/index.esm.js",
        format: "es"
    }],
    plugins: [
        terser()
    ]
}];
