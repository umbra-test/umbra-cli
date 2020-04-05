describe("PostNested", function () {
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
