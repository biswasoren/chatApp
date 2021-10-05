const express = require('express');
const controller = require('./message.controller');

const router = express.Router();

router.post('/send', controller.send);
router.get('/getAll', controller.getAll);

module.exports = router;
