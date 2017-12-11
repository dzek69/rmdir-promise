const rmdir = require("./index");
const silent = rmdir.silent;

const SPY = "𝘴𝘱𝘺";

const createSpy = () => {
    const fn = (... args) => {
        fn[SPY].called = true;
        fn[SPY].calls.push(args)
    };
    fn[SPY] = {
        called: false,
        calls: [],
        reset: () => {
            fn[SPY].called = false;
            fn[SPY].calls.length = 0;
        },
    };
    return fn;
};

describe("rmdir", () => {
    const removeDirectoryMock = createSpy();

    before(() => {
        rmdir.__Rewire__("removeDirectory", removeDirectoryMock);
    });

    after(() => {
        rmdir.__ResetDependency__("removeDirectory");
    });

    beforeEach(() => {
        removeDirectoryMock[SPY].reset();
    });

    it("returns a promise", () => {
        const result = rmdir();
        result.must.be.instanceOf(Promise);
    });

    it("calls to remove directory", () => {
        removeDirectoryMock[SPY].calls.must.have.length(0);

        rmdir("any-dir");
        removeDirectoryMock[SPY].calls.must.have.length(1);
        removeDirectoryMock[SPY].calls[0].must.have.length(2);
        removeDirectoryMock[SPY].calls[0][0].must.be.equal("any-dir");
        removeDirectoryMock[SPY].calls[0][1].must.be.a.function();
    });

    it("resolves with nothing on success", () => {
        const resolve = createSpy();
        const reject = createSpy();

        rmdir("any-dir").then(resolve, reject);

        resolve[SPY].called.must.be.false();
        reject[SPY].called.must.be.false();

        const callback = removeDirectoryMock[SPY].calls[0][1];
        callback(); // no error

        return Promise.resolve().then(() => {
            resolve[SPY].called.must.be.true();
            reject[SPY].called.must.be.false();

            resolve[SPY].calls[0].must.have.length(1);
            (resolve[SPY].calls[0][0] === undefined).must.be.true();
        });
    });

    it("resolves with error on error", () => {
        const resolve = createSpy();
        const reject = createSpy();

        rmdir("any-dir").then(resolve, reject);

        resolve[SPY].called.must.be.false();
        reject[SPY].called.must.be.false();

        const error = {
            an: "error",
        };
        const callback = removeDirectoryMock[SPY].calls[0][1];
        callback(error);

        return Promise.resolve().then(() => {
            resolve[SPY].called.must.be.false();
            reject[SPY].called.must.be.true();

            reject[SPY].calls[0].must.have.length(1);
            reject[SPY].calls[0][0].must.be.equal(error);
        });
    });

    describe("silent version", () => {
        it("ignores when directory does not exist and resolves anyway", () => {
            const resolve = createSpy();
            const reject = createSpy();

            silent("any-dir").then(resolve, reject);

            resolve[SPY].called.must.be.false();
            reject[SPY].called.must.be.false();

            const error = {
                code: "ENOENT",
            };
            const callback = removeDirectoryMock[SPY].calls[0][1];
            callback(error);

            const noop = () => {};

            return Promise.resolve().then(noop).then(() => {
                resolve[SPY].called.must.be.true();
                reject[SPY].called.must.be.false();

                resolve[SPY].calls[0].must.have.length(1);
                (resolve[SPY].calls[0][0] === undefined).must.be.equal(true);
            });
        });

        it("rejects on other error", () => {
            const resolve = createSpy();
            const reject = createSpy();

            silent("any-dir").then(resolve, reject);

            resolve[SPY].called.must.be.false();
            reject[SPY].called.must.be.false();

            const error = {
                code: "ACCESSDENIED",
            };
            const callback = removeDirectoryMock[SPY].calls[0][1];
            callback(error);

            const noop = () => {};

            return Promise.resolve().then(noop).then(() => {
                resolve[SPY].called.must.be.false();
                reject[SPY].called.must.be.true();

                reject[SPY].calls[0].must.have.length(1);
                reject[SPY].calls[0][0].must.be.equal(error);
            });
        });
    });
});
