const mongoose = require('mongoose');
// const validator = require('validator');

const taskSchema = new mongoose.Schema({
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
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;