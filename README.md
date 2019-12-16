# Umbra CLI (early draft)
> Runs tests with Umbra.

```text
Commands
 umbra [options...] [fileGlob...] Runs the given files with the Umbra Test Runner.

General Options
 --debug Enables the Node debugger.
 --debug-brk Enables the Node debugger, breaking once the first test is evaluated.
 --watch Enables watch mode, which will evaluate all tests first and then again once changes occur.
 --config Sets the config file path. Default: ./umbra.config.ts
 --cacheDir The directory in which to store umbra cache files used for dynamic optimization.

Timeout
 --timeoutMs, -t Specifies the general asynchronous timeout value in milliseconds. This affects *all* async methods (it, before, after, etc.)
 --itTimeoutMs Specifies the asynchronous timeout value for `it` blocks in milliseconds. This overrides general settings.
 --beforeTimeoutMs Specifies the asynchronous timeout value for `before` blocks in milliseconds. This overrides general settings.
 --beforeEachTimeoutMs Specifies the asynchronous timeout value for `beforeEach` blocks in milliseconds. This overrides general settings.
 --afterTimeoutMs Specifies the asynchronous timeout value for `after` blocks in milliseconds. This overrides general settings.
 --afterEachTimeoutMs Specifies the asynchronous timeout value for `afterEach` blocks in milliseconds. This overrides general settings.

Reporting
 --outputPath, -o The output directory to write the final results to.
 --reporters, -r The reporters to use by name or by file path.

Parallel Execution
 --idempotentFiles If set, files are treated as idempotent (meaning other file execution does not affect it). 
 --idempotentTests If set, tests are treated as idempotent (meaning other test execution does not affect it). Requires idempotent files.
```