const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const UserController = require("../controllers/user.controller");

router.get("/getall", asyncErrorHandler(UserController.getAllUsers));
router.get("/get-user/:id", asyncErrorHandler(UserController.getUserById));
router.put("/update/:id", asyncErrorHandler(UserController.updateUser));
router.delete("/delete/:id", asyncErrorHandler(UserController.deleteUser));
router.post("/create", asyncErrorHandler(UserController.createUser));
router.post("/activate", asyncErrorHandler(UserController.activateUser));

module.exports = router;
