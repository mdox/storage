const { resolve } = require("path");

require("dotenv-expand").expand(require("dotenv").config());

const ENV_PORT = ~~process.env.PORT;
const ENV_DATA_DIR = resolve(process.env.DATA_DIR);
const ENV_UPLOAD_DIR = resolve(process.env.UPLOAD_DIR);
const ENV_STATIC_DIR = resolve(process.env.STATIC_DIR);

const ENV_MAX_FILE_COUNT = ~~process.env.MAX_FILE_COUNT;
const ENV_MAX_FILE_SIZE = ~~process.env.MAX_FILE_SIZE;

Object.assign(exports, {
  ENV_PORT,
  ENV_DATA_DIR,
  ENV_UPLOAD_DIR,
  ENV_STATIC_DIR,

  ENV_MAX_FILE_COUNT,
  ENV_MAX_FILE_SIZE,
});
