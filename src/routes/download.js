const express = require("express");
const { app } = require("../app");
const { STATIC_DIR } = require("../consts");

app.use("/download", express.static(STATIC_DIR));
