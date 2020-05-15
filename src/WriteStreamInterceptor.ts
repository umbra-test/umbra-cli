/**
 * Manages interception of NodeJS WriteStreams, such as stdout. Allows consumers to listen and/or fully intercept
 * write to the stream.
 */
class WriteStreamInterceptor {

    private started: boolean = false;
    private streamToIntercept: NodeJS.WriteStream | null = null;
    private originalStreamWrite: typeof process.stdout.write | null = null;

    /**
     * Starts the stream interceptor. If passthrough is set to true, then logs will continue to be written to the stream.
     */
    start(streamToIntercept: NodeJS.WriteStream, onWrite: (text: string) => string | void) {
        if (this.started) {
            throw new Error("WriteStreamInterceptor has already been started!");
        }
        this.started = true;
        this.streamToIntercept = streamToIntercept;
        this.originalStreamWrite = this.streamToIntercept.write;

        this.streamToIntercept.write = (string: string) => {
            const processedText = onWrite(string);
            if (typeof processedText === "string") {
                this.writeDirect(processedText);
            }
            return true;
        };
    }

    stop() {
        if (!this.started) {
            throw new Error("WriteStreamInterceptor has not been started!");
        }

        this.streamToIntercept!.write = this.originalStreamWrite!;
        this.started = false;
    }

    /**
     * Writes directly to the underlying WriteStream.
     *
     * @param text
     */
    writeDirect(text: string): void {
        if (!this.started) {
            throw new Error("WriteStreamInterceptor has not been started!");
        }

        this.originalStreamWrite!.apply(this.streamToIntercept, [text]);
    }
}

export { WriteStreamInterceptor };
