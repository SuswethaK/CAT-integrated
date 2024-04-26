const express = require('express');
const { sendMessage } = require("../controllers/messageControllers");
const sessionControl = require("../controllers/session-control");
const { allMessages } = require("../controllers/messageControllers");

const router = express.Router()

router.route("/").post(sessionControl.verifyRequest, sendMessage);
router.route("/:chatId").get(sessionControl.verifyRequest, allMessages);

module.exports=router;