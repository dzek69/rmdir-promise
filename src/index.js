const removeDirectory = require("rmdir");

/**
 * Removes given directory, returns a Promise for nice Promise/async-await flow
 *
 * @param {string} dir - directory to remove
 * @returns {Promise}
 */
const rmdir = dir => new Promise((resolve, reject) => {
    removeDirectory(dir, (err) => {
        err ? reject(err) : resolve();
    });
});

/**
 * Removes given directory, but does not reject when directory does not exist already
 *
 * @param {string} dir - directory to remove
 * @returns {Promise}
 */
rmdir.silent = dir => rmdir(dir).catch(e => {
    if (e.code === "ENOENT") {
        return;
    }
    throw e;
});

module.exports = rmdir;
