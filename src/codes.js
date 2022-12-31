const codes = /** @type {const} */ ([
  "client.collection",
  "client.files",
  "client.items",

  "server.file.access",
  "server.file.exists",
  "server.file.save",
  "server.file.delete",
]);

const codeValue = (/** @type {typeof codes[number]} */ code) => code; // Dev help function.

Object.assign(exports, { codes, codeValue });
