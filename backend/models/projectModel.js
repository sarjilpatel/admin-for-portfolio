const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    liveDemo: {
      type: String,
    },
    github: {
      type: String,
    },
    photo: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
