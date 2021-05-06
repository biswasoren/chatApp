const express = require("express");
const controller = require("./register.controller");

const router = express.Router();

router.post("/add", controller.add);
router.post("/login", controller.login);

module.exports = router;
