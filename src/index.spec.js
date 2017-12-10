const hi = require("./index");

describe("index", () => {
    it("must say hi with name", function () {
        hi("Jack").must.equal("hi Jack");
    });

    it("returns undefined as name when not given", function () {
        hi().must.equal("hi undefined");
    });
});
