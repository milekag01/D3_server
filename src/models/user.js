const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Client = require('./client');

const userSchema = new mongoose.Schema({
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
        validate(value) {
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
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error(`Password cannot contain "password"`)
            }
        }
    },
    authorised: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    links: {
        type: Array
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
});

userSchema.virtual('clients', {
    ref: 'Client',
    localField: '_id',
    foreignField: 'owner'
});



// userSchema.methods.getPublicProfile = function() {
//     const user = this;
//     const userObject = user.toObject();

//     delete userObject.password;
//     delete userObject.tokens;

//     return userObject;
// }

// since res.send() uses toStringify everytime it is called, this function will run by default
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// this kind of methods are instance specific.
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString() }, '13reasonswhy');
    console.log(token);
    // saving tokens to keep track of all login instances
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

// custom method to create a login route
// static methods are accessible on models
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email: email});

    if(!user) {
        throw new Error('User does not exist');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
}

// middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.pre('remove', async function(next) {
    const user = this;
    await Client.deleteMany({owner: user._id});
    next();
})

const User = mongoose.model('User',userSchema);
module.exports = User;