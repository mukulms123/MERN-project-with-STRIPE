const express= require("express");
var router= express.Router();

const {isAdmin, isAuthenticated, isSignedIn}= require("../controllers/auth");
const {getUserById}= require("../controllers/user");
const {getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategory}= require("../controllers/product");

//Params
router.param("productId",getProductById);
router.param("userId",getUserById);


//Route
//create route
router.post("/product/create/:userId",isSignedIn, isAdmin, isAuthenticated, createProduct);

//read routes
router.get("/product/:productId",getProduct);

router.get("/product/photo/:productId",photo);


//delete route
router.delete("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, deleteProduct);

//update route
router.put("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, updateProduct);

//listing routes
router.get("/products",getAllProducts);

router.get("/products/categories",getAllUniqueCategory);

module.exports= router;