/**
 * Manages interception of NodeJS WriteStreams, such as stdout. Allows consumers to listen and/or fully intercept
 * write to the stream.
 */
class WriteStreamInterceptor {
    constructor() {
        this.started = false;
        this.streamToIntercept = null;
        this.originalStreamWrite = null;
    }
    /**
     * Starts the stream interceptor. If passthrough is set to true, then logs will continue to be written to the stream.
     */
    start(streamToIntercept, onWrite) {
        if (this.started) {
            throw new Error("WriteStreamInterceptor has already been started!");
        }
        this.started = true;
        this.streamToIntercept = streamToIntercept;
        this.originalStreamWrite = this.streamToIntercept.write;
        this.streamToIntercept.write = (string) => {
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
        this.streamToIntercept.write = this.originalStreamWrite;
        this.started = false;
    }
    /**
     * Writes directly to the underlying WriteStream.
     *
     * @param text
     */
    writeDirect(text) {
        if (!this.started) {
            throw new Error("WriteStreamInterceptor has not been started!");
        }
        this.originalStreamWrite.apply(this.streamToIntercept, [text]);
    }
}
export { WriteStreamInterceptor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3JpdGVTdHJlYW1JbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Xcml0ZVN0cmVhbUludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILE1BQU0sc0JBQXNCO0lBQTVCO1FBRVksWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixzQkFBaUIsR0FBOEIsSUFBSSxDQUFDO1FBQ3BELHdCQUFtQixHQUF1QyxJQUFJLENBQUM7SUEyQzNFLENBQUM7SUF6Q0c7O09BRUc7SUFDSCxLQUFLLENBQUMsaUJBQXFDLEVBQUUsT0FBd0M7UUFDakYsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3ZFO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1FBRXhELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRTtZQUM5QyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDbkM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsSUFBSSxDQUFDLGlCQUFrQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW9CLENBQUM7UUFDMUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxXQUFXLENBQUMsSUFBWTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztTQUNuRTtRQUVELElBQUksQ0FBQyxtQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0o7QUFFRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyJ9