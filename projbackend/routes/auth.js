var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');
const {signout, signup, signin, isSignedIn}=require("../controllers/auth");


router.post("/signup", [
    check("name","Name should be at least 3 characters.").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","Password should be at least 4 char").isLength({min:4})
    ] , signup);

router.post("/signin", [
    check("email","Email is required").isEmail(),
    check("password","Password should be at least 4 char").isLength({min:4})
    ] , signin);

router.get("/signout",signout);

router.get("/testroute",isSignedIn, (req,res)=>{
    res.send("A protected route");
})

module.exports= router;