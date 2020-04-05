const express = require('express');
const User = require('../models/user');
const router = new express.Router();

// middlewares
const auth = require('../middleware/auth');

// custom login route based on custom login middleware
router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});

    } catch(error) {
        res.status(400).send(error);
    }
})

// logout
router.post('/users/logout',auth, async (req,res) => {
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
router.post('/users/logoutAll',auth,async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save();
        res.send('Logout successful');

    } catch(error) {
        res.status(500).send();
    }
});

// signup route
router.post('/users', async (req,res) => {
    const user = new User(req.body);

    try {
        await user.save();
        // generating 1st token right after signup
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});

    } catch(error) {
        res.status(400).send(error);    // client error
    }
})

// get user profile when he is logged in
router.get('/users/me',auth,async (req,res) => {
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
router.patch('/users/me',auth,async (req,res) => {
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
router.delete('/users/me',auth,async (req,res) => {
    const _id = req.user._id;
    try {
        await req.user.remove();    // mongodb method to remove a user
        res.send(req.user);

    } catch(error) {
        res.status(500).send(error);
    }
})


module.exports = router;