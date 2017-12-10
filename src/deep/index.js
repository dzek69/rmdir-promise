const os = require("os");

/**
 * Returns "howdy" followed by given name or
 *
 * @param {string} [name="stranger"] - name of person to greet
 * @returns {string} - greeting
 */
const howdy = (name = "stranger") => "howdy " + name + " on " + os.platform();

module.exports = howdy;
