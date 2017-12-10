const howdy = require("./index");

describe("howdy", () => {
    it("must say howdy with name", function () {
        howdy("Jack").must.equal("howdy Jack");
    });

    it("returns `stranger` as name when not given", function () {
        howdy().must.equal("howdy stranger");
    });
});
