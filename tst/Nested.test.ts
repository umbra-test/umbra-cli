describe("Nested", function () {
    it("should run this test", function (done) {
        console.error("A");
        setTimeout(done, 1000);
    });

    it("should fail this test", function (done) {
        console.error("B");
        setTimeout(() => done(new Error("failed!")), 1000);
    });

    it("should timeout this test", function (done) {
        console.error("C");
        setTimeout(done, 2000);
    }, {
        timeoutMs: 1000
    });

    describe("Nested2", function () {

        it("should run this test", function (done) {
            console.error("A");
            setTimeout(done, 1000);
        });

        it("should fail this test", function (done) {
            console.error("B");
            setTimeout(() => done(new Error("failed!")), 1000);
        });

        it("should timeout this test", function (done) {
            console.error("C");
            setTimeout(done, 2000);
        }, {
            timeoutMs: 1000
        });

        describe("Nested3", function () {

            it("should run this test", function (done) {
                console.error("A");
                setTimeout(done, 1000);
            });

            it("should fail this test", function (done) {
                console.error("B");
                setTimeout(() => done(new Error("failed!")), 1000);
            });

            it("should timeout this test", function (done) {
                console.error("C");
                setTimeout(done, 2000);
            }, {
                timeoutMs: 1000
            });

        });
    });
});
