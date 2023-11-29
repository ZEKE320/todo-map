/* eslint-env node */
const autoprefixer = require("autoprefixer");

/** @type {import("postcss-load-config").Config} */
module.exports = {
  plugins: [autoprefixer({ cascade: false })],
};
