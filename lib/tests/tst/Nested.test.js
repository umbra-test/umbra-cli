describe("Nested", function () {
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
    describe("Nested2", function () {
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
        describe("Nested3", function () {
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
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmVzdGVkLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90c3QvTmVzdGVkLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxDQUFDLFFBQVEsRUFBRTtJQUNmLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLElBQUk7UUFDckMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxVQUFVLElBQUk7UUFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBCQUEwQixFQUFFLFVBQVUsSUFBSTtRQUN6QyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUMsRUFBRTtRQUNDLFNBQVMsRUFBRSxJQUFJO0tBQ2xCLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDaEIsRUFBRSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsSUFBSTtZQUNyQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHVCQUF1QixFQUFFLFVBQVUsSUFBSTtZQUN0QyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxJQUFJO1lBQ3pDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxFQUFFO1lBQ0MsU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUNoQixFQUFFLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxJQUFJO2dCQUNyQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHVCQUF1QixFQUFFLFVBQVUsSUFBSTtnQkFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDBCQUEwQixFQUFFLFVBQVUsSUFBSTtnQkFDekMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDLEVBQUU7Z0JBQ0MsU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=