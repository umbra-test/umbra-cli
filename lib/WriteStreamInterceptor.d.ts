/// <reference types="node" />
/**
 * Manages interception of NodeJS WriteStreams, such as stdout. Allows consumers to listen and/or fully intercept
 * write to the stream.
 */
declare class WriteStreamInterceptor {
    private started;
    private streamToIntercept;
    private originalStreamWrite;
    /**
     * Starts the stream interceptor. If passthrough is set to true, then logs will continue to be written to the stream.
     */
    start(streamToIntercept: NodeJS.WriteStream, onWrite: (text: string) => string | void): void;
    stop(): void;
    /**
     * Writes directly to the underlying WriteStream.
     *
     * @param text
     */
    writeDirect(text: string): void;
}
export { WriteStreamInterceptor };
