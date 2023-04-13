const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {

    const {email, password} = req.body;
    try {
        const isUserExists = await userModel.findOne({email : email}); 
         if(!isUserExists) {
            return res.status(404).json({message: "user nor found"});
         }

         const matchPassword = await bcrypt.compare(password, isUserExists.password);
         if(!matchPassword) {
            return res.status(400).json({message: "Wrong password"});
         }
        
         const token = jwt.sign({email : isUserExists.email, id : isUserExists._id}, process.env.SECRET_KEY);
         res.status(200).json({user: isUserExists, token});
    }
    catch (error) {
        console.log(error);
        res.status(404).json({message: "not working"});
    }
}

const signup = async (req, res) => {

    const {username, email, password} = req.body;
    try {
        // already user
         const isUserExists = await userModel.findOne({email : email}); 
         if(isUserExists) {
            return res.status(400).json({message: "user already exist"});
         }

         // password hashing
         const hashedPassword = await bcrypt.hash(password, 10); 

         // user creation
         const result = await userModel.create({ 
            username : username,
            email : email,
            password : hashedPassword
         });

         // token generate
         const token = jwt.sign({email : result.email, id : result._id}, process.env.SECRET_KEY);
         res.status(201).json({user: result, token});
    }
    catch (error) {
        console.log(error);
        res.status(404).json({message: "not working"});
    }
}

module.exports = {signin, signup};