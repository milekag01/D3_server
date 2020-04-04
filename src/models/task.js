const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task', {
    task_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    weight: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    priority: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = Task;