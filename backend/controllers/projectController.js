const cloudinary = require("../configs/cloudinary");
const Project = require("../models/projectModel");

exports.addProject = async (req, res) => {
  try {
    const { title, liveDemo, github, image } = req.body;

    const myCloud = await cloudinary.uploader.upload(image, {
      folder: "projects",
    });

    const project = await Project.create({
      title,
      liveDemo,
      github,
      photo: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    await project.remove();

    res.status(200).json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllProject = async (req, res) => {
  try {
    const projects = Project.find();

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
