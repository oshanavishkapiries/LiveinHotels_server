const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const UserController = require("../controllers/user.controller");

router.post("/create", asyncErrorHandler(UserController.createUser));

module.exports = router;
