const { UPLOAD_DIR, STATIC_DIR } = require("./consts");
const { mkdir } = require("fs/promises");

async function init() {
  await Promise.all([
    mkdir(UPLOAD_DIR, { recursive: true }),
    mkdir(STATIC_DIR, { recursive: true }),
  ]);
}

Object.assign(exports, {
  init,
});
