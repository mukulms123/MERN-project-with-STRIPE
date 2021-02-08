const User= require("../models/user");
const express= require("express");
var router= express.Router();

const {isSignedIn, isAdmin, isAuthenticated}= require("../controllers/auth");
const {getUserById, getUser, updateUser, userPurchaseList }= require("../controllers/user");

router.param("userId",getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId",isSignedIn, isAuthenticated, updateUser);

router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList)

module.exports= router;