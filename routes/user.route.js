const express = require("express");
const { createNewUser, loginUser } = require("../core/user.core");

const router = express.Router();

router.post("/register", createNewUser);

router.post("/login", loginUser);

module.exports = router;
