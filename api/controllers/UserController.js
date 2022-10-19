const Users = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

class UserController {
    // [POST] /api/auth/register
    async register(req, res) {
        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
              req.body.password,
              process.env.SECRET_KEY
            ).toString(),
          });
          try {
            const user = await newUser.save();
            res.status(201).json(user);
          } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    // [POST] /api/auth/login
    async login (req, res) {
        try {
            const user = await Users.findOne({ email: req.body.email });
            !user && res.status(401).json("Wrong password or username!");
        
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        
            originalPassword !== req.body.password &&
              res.status(401).json("Wrong password or username!");
        
            
            const accessToken = jwt.sign(
              { id: user._id, isAdmin: user.isAdmin },
              process.env.SECRET_KEY,
              { expiresIn: "5d" }
            );
            
            const { password, ...info } = user._doc;
        
            res.status(200).json({ ...info, accessToken });
          } catch (err) {
            res.status(500).json(err);
          }
            
        }
    // [PUT] /api/users/:id
  async async (req, res ) {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
  
      try {
        const updatedUser = await Users.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }}


  // [DELETE] /api/users/:id
    async delete (req, res) {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
          await Users.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You can delete only your account!");
      }}
 //[GET] /users/find/:id
  async find(req, res) {
        try {
          const user = await Users.findById(req.params.id);
          const { password, ...info } = user._doc;
          res.status(200).json(info);
        } catch (err) {
          res.status(500).json(err);
        }
    }
  // [GET] /users/
  async getUsers(req, res) {
      const query = req.query.new;
       if (req.user.isAdmin) {
       try {
        const users = query
          ? await Users.find().sort({ _id: -1 }).limit(5) // so luongj hien ra 
          
          : await Users.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
      } else {
        res.status(403).json("You are not allowed to see all users!");
      }
    }
  // [GET] /users/stats
  async getUserStart(req, res) {
      const today = new Date();
      const latYear = today.setFullYear(today.setFullYear() - 1);

      try {
        const data = await Users.aggregate([
            {
            $project: {
              month: { $month: "$createdAt" },
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: 1 },
            },
          },
        ]);
        res.status(200).json(data)
        } catch (err) {
          res.status(500).json(err);
        }};
  }
    

module.exports = new UserController();