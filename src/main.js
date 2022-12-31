const { init } = require("./init");
const { app } = require("./app");
const { PORT } = require("./consts");
require("./routes");

async function main() {
  await init();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

Object.assign(exports, {
  main,
});
