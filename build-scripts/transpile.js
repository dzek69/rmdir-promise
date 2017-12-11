const { silent: rmdir } = require("./../src/index");

(async () => {
    const tasks = [
        rmdir("dist"),
    ];

    try {
        await Promise.all(tasks);
    }
    catch (error) {
        console.error("There was a problem with transpiling: ", error);
        process.exit(1);
    }
})();
