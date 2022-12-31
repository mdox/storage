const { app } = require("../app");
const { unlink, rmdir } = require("fs/promises");
const { join } = require("path");
const { STATIC_DIR } = require("../consts");
const { codeValue } = require("../codes");

app.post("/delete/:collection", async (req, res) => {
  console.log("Start `/delete/:collection` " + new Date().toISOString());

  const collection = req.params.collection;

  if (collection.length < 1 || collection.length > 255) {
    res.status(413).json({ ok: false, code: codeValue("client.collection") });
    return;
  }

  const collectionDir = join(STATIC_DIR, collection);

  /** @type {[string, string][]} */
  const items = req.body;

  if (
    !Array.isArray(items) ||
    items.some(
      (item) =>
        !Array.isArray(item) ||
        item.length !== 2 ||
        item.some(
          (value) =>
            typeof value !== "string" || value.length < 1 || value.length > 255
        )
    )
  ) {
    res.status(400).json({ ok: false, code: codeValue("client.items") });
    return;
  }

  /** @type {{code: keyof i18n; message: typeof i18n[keyof i18n]}[]} */
  const results = await Promise.all(
    items.map(async (item) => {
      const [fileid, filename] = item;
      const filedir = join(collectionDir, fileid);
      const filepath = join(filedir, filename);

      const result = {
        ok: true,
        code: codeValue("server.file.delete"),
      };

      try {
        await unlink(filepath);
      } catch (err) {
        if (err.code === "ENOENT") {
          result.ok = false;
          result.code = codeValue("server.file.exists");
        } else {
          result.ok = false;
          result.code = codeValue("server.file.access");
          console.error(err);
        }
      }

      if (result.ok) {
        try {
          await rmdir(filedir);
          await rmdir(collectionDir);
        } catch (err) {
          if (err.code !== "ENOTEMPTY") {
            console.error(err);
          }
        }
      }

      return result;
    })
  );

  const responseData = {
    ok: results.every((result) => result.ok),
    results,
  };

  res.json(responseData);

  console.log("End `/delete/:collection` " + new Date().toISOString());
});
