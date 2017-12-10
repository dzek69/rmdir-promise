/**
 * Returns "howdy" followed by given name or
 *
 * @param {string} [name="stranger"] - name of person to greet
 * @returns {string} - greeting
 */
const howdy = (name = "stranger") => "howdy " + name;

module.exports = howdy;
