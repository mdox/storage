const { app } = require("../app");
const formidable = require("formidable");
const { mkdir, copyFile, constants, unlink } = require("fs/promises");
const { join } = require("path");
const {
  UPLOAD_DIR,
  STATIC_DIR,
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
} = require("../consts");
const { codeValue } = require("../codes");

app.post("/upload/:collection", async (req, res) => {
  console.log("Start `/upload/:collection` " + new Date().toISOString());

  const collection = req.params.collection;

  if (collection.length > 255) {
    res.status(413).json({ ok: false, code: codeValue("client.collection") });
    return;
  }

  const collectionDir = join(STATIC_DIR, collection);

  /** @type {formidable.File[]} */
  const files = await new Promise((resolve) => {
    formidable({
      allowEmptyFiles: false,
      hashAlgorithm: "md5",
      maxFields: 0,
      maxFiles: MAX_FILE_COUNT,
      maxFileSize: MAX_FILE_SIZE,
      multiples: true,
      uploadDir: UPLOAD_DIR,
    }).parse(req, (err, _fields, fileFields) => {
      if (err) {
        console.error(err);
        resolve([]);
      } else {
        const file = fileFields.file;
        const files = Array.isArray(file) ? file : [file];
        resolve(files);
      }
    });
  });

  if (files.length === 0) {
    res.status(400).json({ ok: false, code: codeValue("client.files") });
    return;
  }

  const results = await Promise.all(
    files.map(async (file) => {
      const fileid = Buffer.from(file.hash).toString("base64url");
      const filedir = join(collectionDir, fileid);
      const filepath = join(filedir, file.originalFilename);

      const result = {
        ok: true,
        code: codeValue("server.file.save"),
        fileid,
      };

      try {
        await mkdir(filedir, { recursive: true });
        await copyFile(file.filepath, filepath, constants.COPYFILE_EXCL);
      } catch (err) {
        if (err.code === "EEXIST") {
          result.ok = false;
          result.code = codeValue("server.file.exists");
        } else {
          result.ok = false;
          result.code = codeValue("server.file.access");
          console.error(err);
        }
      }

      try {
        await unlink(file.filepath);
      } catch (err) {
        console.error(err);
      }

      return result;
    })
  );

  const responseData = {
    ok: results.every((result) => result.ok),
    results,
  };

  res.json(responseData);

  console.log("End `/upload/:collection` " + new Date().toISOString());
});
