const express = require("express");
const router = express.Router();
const User = require("../Model/userSchema");
const jwt = require("jsonwebtoken");
const {
  userSignup,
  userSignin,
  fetchAllUsersController,
} = require("../Controller/userController");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.get("/fetchUsers", protect, fetchAllUsersController);
module.exports = router;
