const express = require("express");
const { login, logout, getAdmin } = require("../controllers/adminControllers");
const { isAuthenticated } = require("../middleWares/auth");

const router = express.Router();

router.route("/login").post(login);
router.route("/adminpanel").get(isAuthenticated, getAdmin);

router.route("/logout").get(isAuthenticated, logout);

module.exports = router;
