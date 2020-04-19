import { TestRunner } from "@umbra-test/umbra-test-runner";
const CreateRunner = (context) => {
    context.runner = new TestRunner({
        timeoutMs: context.config.timeoutMs,
        stopOnFirstFail: false
    });
    return context;
};
export { CreateRunner };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlUnVubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1N0YXJ0dXBTdGFnZXMvQ3JlYXRlUnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUV6RCxNQUFNLFlBQVksR0FBRyxDQUFDLE9BQXVCLEVBQTJCLEVBQUU7SUFDdEUsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQztRQUM1QixTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTO1FBQ25DLGVBQWUsRUFBRSxLQUFLO0tBQ3pCLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMsQ0FBQztBQUVGLE9BQU8sRUFBQyxZQUFZLEVBQUMsQ0FBQyJ9