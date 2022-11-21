const express = require("express");
const {
  addProject,
  deleteProject,
  getAllProject,
} = require("../controllers/projectController");
const { isAuthenticated } = require("../middleWares/auth");

const router = express.Router();

router.route("/projects/:id").delete(isAuthenticated, deleteProject);
router
  .route("/projects")
  .post(isAuthenticated, addProject)
  .get(isAuthenticated, getAllProject);

module.exports = router;
