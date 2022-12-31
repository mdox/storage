const { join, resolve } = require("path");
const {
  ENV_PORT,
  ENV_DATA_DIR,
  ENV_UPLOAD_DIR,
  ENV_STATIC_DIR,
  ENV_MAX_FILE_COUNT,
  ENV_MAX_FILE_SIZE,
} = require("./env");

const PORT = ENV_PORT || 8000;
const DATA_DIR = ENV_DATA_DIR || resolve("_data");
const UPLOAD_DIR = ENV_UPLOAD_DIR || join(DATA_DIR, "upload");
const STATIC_DIR = ENV_STATIC_DIR || join(DATA_DIR, "static");

const MAX_FILE_COUNT = ENV_MAX_FILE_COUNT || 100;
const MAX_FILE_SIZE = ENV_MAX_FILE_SIZE || 1024 * 1024 * 100;

Object.assign(exports, {
  PORT,
  DATA_DIR,
  UPLOAD_DIR,
  STATIC_DIR,

  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
});
