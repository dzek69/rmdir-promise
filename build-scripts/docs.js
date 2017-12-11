const fs = require("fs");
const mkdir = require("mkdirp-promise");
const { silent: rmdir } = require("./../src/index");

(async () => {
    const tasks = [
        rmdir("docs"),
        mkdir("tutorials"),
    ];

    try {
        await Promise.all(tasks);
        // @todo make it a list, and remove these specific files after transpiling
        fs.copyFileSync("./CHANGELOG.md", "./tutorials/CHANGELOG.md");
    }
    catch (error) {
        console.error("There was a problem with generating docs: ", error);
        process.exit(1);
    }
})();
