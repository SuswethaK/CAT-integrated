const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const sessionControl = require("../controllers/session-control");

const router = express.Router();

router.route("/").post( accessChat);
router.route("/").get( fetchChats);
router.route("/group").post( createGroupChat);
router.route("/rename").put(sessionControl.verifyRequest, renameGroup);
router.route("/groupremove").put(sessionControl.verifyRequest, removeFromGroup);
router.route("/groupadd").put(sessionControl.verifyRequest, addToGroup);

module.exports = router;