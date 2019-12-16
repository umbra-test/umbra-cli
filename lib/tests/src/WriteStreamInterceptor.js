"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.WriteStreamInterceptor = WriteStreamInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3JpdGVTdHJlYW1JbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Xcml0ZVN0cmVhbUludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztHQUdHO0FBQ0gsTUFBTSxzQkFBc0I7SUFBNUI7UUFFWSxZQUFPLEdBQVksS0FBSyxDQUFDO0lBNkNyQyxDQUFDO0lBekNHOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGlCQUFxQyxFQUFFLE9BQXdDO1FBQ2pGLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztTQUN2RTtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQztRQUV4RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDdEMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztTQUNuRTtRQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLElBQVk7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7U0FDbkU7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUNKO0FBRU8sd0RBQXNCIn0=