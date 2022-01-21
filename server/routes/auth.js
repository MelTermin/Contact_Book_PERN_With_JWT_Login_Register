const express=require("express");
const pool = require("../db");
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const checkAuth = require ("../middleware/checkAuth");
const env=require('dotenv')
env.config();
const jwtGenerator = require("../utils/jwt-generator");

const router=express.Router();

router.post('/register', body("email").isEmail().withMessage("The email is invalid"),body("password").isLength({min:5}).withMessage("The password must be six characters long"), async(req,res) => {
  
  //Catching the validation error
  const validationErrors=validationResult(req);
  
  if(!validationErrors.isEmpty()) {
    const errors=validationErrors.array().map((error)=> {
      return {
        msg:error.msg
      }

    })
    return res.json({errors,data: null});
  }
    // when client clicks on submit this is how we will get the data from client to server side to save into a database
  const {email,password,name}=req.body;

  //checking if the email is on databse

  const user= await pool.query("SELECT * FROM users WHERE user_email=$1",[email]);

  if(user.rows.length !==0) {// if the user exists//
    return res.json({
      errors: [
        {
          msg: "Email already in use",
        },
      ],
      data: null,
    });
  }

// hashing the password and saving to the database
  const saltRound=10;
  const salt=await bcrypt.genSalt(saltRound);
  const bcryptPassword= await bcrypt.hash(password,salt);
  const {rows}= await pool.query("INSERT INTO users(user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",[name, email,bcryptPassword])

  // res.json(newUser.rows[0])

  //creating  the token

  const token = await jwtGenerator({
    id: rows[0].user_id,
    name: rows[0].user_name,
    email: rows[0].user_email,
  });
  // sending the token as a response
  // res.json(token);

  res.json({
    errors: [],
    data: {
      token,
      user: {
        id: rows[0].user_id,
        name: rows[0].user_name,
        email: rows[0].user_email,
      },
    },
  });

  
})


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

 
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);
    // if the user exists//

    if(user.rows.length ===0) {
      return res.json({
        errors: [
          {
            msg: "Wrong Email entry",
          },
        ]
      });
    }


    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.json({
        errors: [
          {
            msg: "Wrong Password",
          },
        ]
      });
    }
    
    //3. creating token
    const { rows } = user;

    const token = await jwtGenerator({
      id: rows[0].user_id,
      name: rows[0].user_name,
      email: rows[0].user_email,
		});

		//4. sending the token as a response
    res.json({
      errors: [],
      data: {
        token,
        user: {
          id: rows[0].user_id,
          name: rows[0].user_name,
          email: rows[0].user_email,
        },
      },
    });

});


router.get("/me", checkAuth, async (req, res) => {



const {rows} = await pool.query("SELECT * FROM users WHERE user_email = $1", [
  req.user.email
]);

return res.json({
  errors: [],
  data: {
    user: {
      id: rows[0].user_id,
      name: rows[0].user_name,
      email: rows[0].user_email,
     
    },
  },
});

});



module.exports = router;