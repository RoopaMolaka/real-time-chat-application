
        

const generateToken = require("../Config/generateToken");
// const express=require("express")
const User = require("../Model/userSchema");
const expressAsyncHandler = require("express-async-handler");

let userSignin = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log("fetched user Data", user);
  console.log(await user.matchPassword(password));
  if (user && (await user.matchPassword(password))) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
    console.log("login successful",response);
    res.json(response);
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
  
});


 let userSignup = expressAsyncHandler(async (req, res) => {
     const { name, email, password } = req.body;
     
   if (!name || !email || !password) {
     res.send(400);
     throw Error("All necessary input fields have not been filled");
   }

   
   const userExist = await User.findOne({ email });
   if (userExist) {
    
     throw new Error("User already Exists");
   }

   
   const userNameExist = await User.findOne({ name });
   if (userNameExist) {
    
     throw new Error("UserName already taken");
   }

   
   const user = await User.create({ name, email, password });
   if (user) {
     res.status(201).json({
       _id: user._id,
       name: user.name,
       email: user.email,
    
       token: generateToken(user._id),
     });
   } else {
     res.status(400);
     throw new Error("Registration Error");
   }
 });

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

module.exports = {
    userSignin,
   userSignup,
  fetchAllUsersController,
};