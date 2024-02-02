const express = require("express");
const { allMessages, sendMessage } = require("../Controller/msgController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
console.log("allMessages", allMessages);
router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;
