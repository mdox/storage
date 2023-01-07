const { join, resolve } = require("path");
const {
  ENV_PORT,
  ENV_DATA_DIR,
  ENV_UPLOAD_DIR,
  ENV_STATIC_DIR,
  ENV_MAX_FILE_COUNT,
  ENV_MAX_FILE_SIZE,
} = require("./env");

const PORT = ENV_PORT;
const DATA_DIR = ENV_DATA_DIR;
const UPLOAD_DIR = ENV_UPLOAD_DIR;
const STATIC_DIR = ENV_STATIC_DIR;

const MAX_FILE_COUNT = ENV_MAX_FILE_COUNT;
const MAX_FILE_SIZE = ENV_MAX_FILE_SIZE;

Object.assign(exports, {
  PORT,
  DATA_DIR,
  UPLOAD_DIR,
  STATIC_DIR,

  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
});
