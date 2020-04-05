const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    bio: {
        type: String,
        trim: true
    },
    role: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
        validate: (value) => {
            if(value.toLowerCase().includes('password')) {
                throw new Error(`Password cannot contain "password"`)
            }
        }
    },
    authorised: {
        type: Boolean,
        default: false
    },
    links: {
        type: Array
    }
});

// middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt(user.password, 8);
    }

    next();
});

const User = mongoose.model('User',userSchema);
module.exports = User;