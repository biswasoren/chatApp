const express = require("express");
const controller = require("./health.controller");

const router = express.Router();

router.get("/check", controller.send);

module.exports = router;
