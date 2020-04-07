const mongoose = require('mongoose');
const validator = require('validator');

const clientSchema = new mongoose.Schema({
    client_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: (value) => {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    point_of_contact: {
        type: String,
        trim: true
    },
    contact: {
        type: Number,
        trim: true
    },
    projects: {
        type: Array
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subowners: [String]
}, {
    timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;