const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const router = new express.Router();

// middlewares
const auth = require('../middleware/auth');

// custom login route based on custom login middleware
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});

    } catch(error) {
        res.status(400).send(error);
    }
})

// logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        res.send('Logout successful');

    } catch(error) {
        res.status(500).send();
    }
})

// logout all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save();
        res.send('Logout successful');

    } catch(error) {
        res.status(500).send();
    }
});

// signup route
router.post('/users', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    console.log('userPost: ', user);
    try {

        await user.save();
        console.log('user saved');
        // generating 1st token right after signup
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});

    } catch(error) {
        res.status(400).send('unable to create user: server error');    // client error
    }
})

// get user profile when he is logged in
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);     // req.user in set when user is loggen in in our middleware
})

// get all users (only for admin)
// router.get('/users', async (req,res) => {

//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch(error) {
//         res.status(500).send(error);    // Server error
//     }
// })

// router.get('/users/:id', async (req,res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if(!user) {
//             return res.status(404).send('Unable to find user')
//         }
//         res.send(user);
//     } catch(error) {
//         res.status(500).send(error);    // Server error
//     }
// })

// edit any user profile
// router.patch('/users/:id', async (req,res) => {
//     const _id = req.params.id;
//     const updates = Object.keys(req.body);

//     try {
//         // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
//         // the above syntax skip the mongoose and hence we cannot use middleware used for hashing here

//         const user = await User.findById(_id);

//         updates.forEach((update) => {
//             user[update] = req.body[update]
//         });
//         await user.save();

//         if(!user) {
//             res.status(404).send('unable to find the user to update');
//         }
//         res.send(user);

//     } catch(error) {
//         res.status(400).send(error);
//     }
// })

// edit my profile
router.patch('/users/me', auth, async (req, res) => {
    // const _id = req.user._id;
    const updates = Object.keys(req.body);

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        });
        await req.user.save();

        res.send(req.user);

    } catch(error) {
        res.status(400).send(error);
    }
})

// delete any user whose id is available-----------

// router.delete('/users/:id', async (req,res) => {
//     const _id = req.params.id;
//     try {
//         const user = await User.findByIdAndDelete(_id);
//         if(!user) {
//             return res.status(404).send('No user to delete with given id');
//         }
//         res.send(user);

//     } catch(error) {
//         res.status(500).send(error);
//     }
// })

// delete my profile
router.delete('/users/me', auth, async (req, res) => {
    // const _id = req.user._id;
    try {
        await req.user.remove();    // mongodb method to remove a user
        res.send(req.user);

    } catch(error) {
        res.status(500).send(error);
    }
})

// file upload
// const multer = require('multer');

// here if we provide dest, we will never get the image or file in the function,
// instead, it will be saved in local directory which we dont want.
// so we remove that dest.

// const upload = multer({
//     dest: 'avataar',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, callback) {
//         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return callback(new Error('please upload an image'));
//         }

//         callback(undefined, true);
//     }
// });

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('please upload an image'));
        }

        callback(undefined, true);
    }
});

// post avatar & update avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;

    await req.user.save();
    res.send('upload successful');
// eslint-disable-next-line no-unused-vars
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})

// delete avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();

    res.send('Avatar delete successful');
})
// note: to convert base64 to jpg back, use <img src="data:image/jpg;base64,---"></img>
// to handle error inc ase of multer, we need a
// function with call signature as shown above.

// hosting file/image on a url to access it easily
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);

    } catch(error) {
        res.status(404).send();
    }
})

module.exports = router;