const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Employee model
const Employee = require('../models/employee');

// @route POST employee/register
// @desc Register employee
// @access Public
router.get ('/register',(req, res)=>{
    const{name,email,position,password}=req.body;

    //Validation
   if(!name || !email || !position || !password){
      return res.status(400).json({ msg: 'Please enter all fields'});
   }

   //Check for existing user
   Employee.findOne({email: req.body.email}).then(employee=>{
      if(employee) return res.status(400).json({msg:'User already exist'});

      const newEmplyee = new Employee({
         name,
         email,
         position,
         password
      });

      //Create salt & hash
      bcrypt.genSalt(10, (err, salt)=>{
         bcrypt.hash(newEmplyee.password, salt, (err, hash)=>{
            if(err) throw err;
            newEmplyee.password = hash;
            newEmplyee.save()
            .then(employee=>{
               //Giving the output
               console.log("Registration succeed!");
               
               //Verify user by jwt
               jwt.sign(
                  { id: employee.id },
                  config.get('jwtSecret'),
                  { expiresIn: 7200},
                  (err,token)=>{
                     if(err) throw err;
                     res.json({
                        token,
                        employee: {
                           id: employee.id,
                           name: employee.name,
                           email: employee.email,
                           position: employee.position
                        }
                     });
                  }
               )              
            })
         })
      })
   })
});

// @route POST employee/auth
// @desc Authenticate the employee
// @access Public
router.post ('/auth',(req, res)=>{
   const{email,password}=req.body;
   
    //Validation
    if(!email || !password){
      return res.status(400).json({ msg: 'Please enter all fields'});
   }

   //Check for existing user
   Employee.findOne({email: req.body.email}).then(employee=>{
      if(!employee) return res.status(400).json({msg:'User does not exist'});

      //Validating password
      bcrypt.compare(password,employee.password)
      .then(isMatch =>{
         if(!isMatch) return res.status(400).json({ msg: 'Invalid credintials'});

         //Verify user by jwt
         jwt.sign(
            { id: employee.id },
            config.get('jwtSecret'),
            { expiresIn: 7200},
            (err,token)=>{
               if(err) throw err;
               console.log("User logged in!");
               res.json({
                  token,
                  employee: {
                     id: employee.id,
                     name: employee.name,
                     email: employee.email,
                     position: employee.position
                  }
               });
            }
         )

      })
   })
});


module.exports = router;