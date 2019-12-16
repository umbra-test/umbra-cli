/**
 * Manages interception of NodeJS WriteStreams, such as stdout. Allows consumers to listen and/or fully intercept
 * write to the stream.
 */
class WriteStreamInterceptor {
    constructor() {
        this.started = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3JpdGVTdHJlYW1JbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Xcml0ZVN0cmVhbUludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILE1BQU0sc0JBQXNCO0lBQTVCO1FBRVksWUFBTyxHQUFZLEtBQUssQ0FBQztJQTZDckMsQ0FBQztJQXpDRzs7T0FFRztJQUNILEtBQUssQ0FBQyxpQkFBcUMsRUFBRSxPQUF3QztRQUNqRixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDdkU7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7UUFFeEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNuQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7U0FDbkU7UUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxJQUFZO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDSjtBQUVELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxDQUFDIn0=