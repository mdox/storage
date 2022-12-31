const express = require("express");
const cors = require("cors");
const { STATIC_DIR } = require("./consts");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/download", express.static(STATIC_DIR));

Object.assign(exports, { app });
