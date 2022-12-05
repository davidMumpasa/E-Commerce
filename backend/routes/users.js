const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// get users
router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');
 
    if(!userList){
        res.status(500).json({success: false});
    }

    res.send(userList);
})

// Get singole user
router.get('/:id',async(req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');;

    if(!user){
        res.status(500).json({message: 'The user with the Id was not found'})
    } 
    res.status(200).send(user);
})

// sign up
router.post('/register', async(req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdnin: req.body.isAdnin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user can not be created!!')

    res.send(user);
})

// Login
router.post('/login', async (req, res) =>{
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;

    if(!user){
        return res.status(400).send(user);
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){

        const token = jwt.sign(
            {
                userId: user.id,
                isAdnin: user.isAdnin
            },
            secret,
            {
                expiresIn: '1d'
            }
        )

        res.status(200).send({user: user.email,token: token})
    } else {
        return res.status(400).send('Password is wrong!!');
    }
   
})

// Get number of users
router.get('/get/count', async (req, res) =>{
    let userCount = await User.countDocuments()
 
    if(!userCount){
        res.status(500).json({success: false});
    }

    res.send({
        userCount: userCount
    });
})

// Delete user
router.delete('/:id', (req, res)=>{
    User.findByIdAndDelete(req.params.id).then(user =>{
        if(user){
            return res.status(200).json({success: true, message: 'the user has been deleted'})
        } else {
            return res.status(404).json({success: false , message: "the user was not found"})
        }
    }).catch(err=>{
        return res.status(400).json({success: false,error: err})
    })
})

module.exports = router;