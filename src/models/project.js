const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    progress: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true
    },
    prod_URL: {
        type: String,
        trim: true
    },
    dev_URL: {
        type: String,
        trim: true
    },
    github: {
        type: String,
        trim: true
    },
    tasks: {
        type: Array
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;