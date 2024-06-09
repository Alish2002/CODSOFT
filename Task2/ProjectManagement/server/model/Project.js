const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ['admin', 'manager', 'member'],
          required: true,
        },
      },
    ],
    tasks: [  
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },{ timestamps: true } // auto add the created_at and updated_at
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
