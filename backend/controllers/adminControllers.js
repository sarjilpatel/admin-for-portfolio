const Project = require("../models/projectModel");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username === "sarjilpatel")) {
      return res.status(400).json({
        success: false,
        message: "Admin does not exist",
      });
    }

    if (!(password === "SARjil@543")) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const projects = await Project.find({});

    const token = await jwt.sign(
      { _id: "sarjilpatel" },
      process.env.JWT_SECRET
    );

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: false,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      projects,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
