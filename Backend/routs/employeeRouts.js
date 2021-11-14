const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.diskStorage({
   destination : function(req,file,cb){
      cb(null,'./uploads/')
   },
   filename : function (req,file,cb){
      cb(null,new Date().toString()+file.originalname);
   }
})
const fileFilter = (req,file,cb) => {
   if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
      cb(null,true);
   }else{
      cb(null,false);
   }
}
const upload =  multer({
   storage:storage,
   limits:{fileSize : 1024*1024*500},
   fileFilter : fileFilter

});

//Employee model
const Employee = require('../models/employee');

// @route POST employee/register
// @desc Register employee
// @access Public
router.post ('/register',upload.single('profileImage'),(req, res)=>{
   const{name,email,position,password,role}=req.body;

    //Validation
   if(!name || !email || !position || !password || !role){
      return res.status(400).json({ msg: 'Please enter all fields'});
   }

   //Check for existing user
   Employee.findOne({email: req.body.email}).then(employee=>{
      if(employee) return res.status(400).json({msg:'User already exist'});

      const newEmplyee = new Employee({
         name,
         email,
         position,
         password,
         role,
         profileImage:req.file.path
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
                           position: employee.position,
                           role: employee.role,
                           profileImage:req.file.path
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
                     position: employee.position,
                     role: employee.role,
                     profileImage: employee.profileImage
                  }
               });
            }
         )

      })
   })
});



module.exports = router;