describe("GlobalMethods", function () {
    it("should run this test", function (done) {
        setTimeout(done, 1000);
    });
    it("should fail this test", function (done) {
        setTimeout(() => done(new Error("failed!")), 1000);
    });
    it("should timeout this test", function (done) {
        setTimeout(done, 2000);
    }, {
        timeoutMs: 1000
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2xvYmFsTWV0aG9kcy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHN0L0dsb2JhbE1ldGhvZHMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLENBQUMsZUFBZSxFQUFFO0lBQ3RCLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLElBQUk7UUFDckMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxVQUFVLElBQUk7UUFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBCQUEwQixFQUFFLFVBQVUsSUFBSTtRQUN6QyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUMsRUFBRTtRQUNDLFNBQVMsRUFBRSxJQUFJO0tBQ2xCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=