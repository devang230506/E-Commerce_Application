const express = require("express");
const router = express.Router();
const { getDummyProducts, addProducts, getProductsById, getProducts, updateProducts, deleteProducts } = require('../controllers/productController')
const authMiddleware = require('./../middlewares/authMiddleware')
//Routes
//Publically available 
//some products >> GET
//getProducts

//getProducts >> Dummz data
router.get('/productDummy', authMiddleware, getDummyProducts);

//CRUD
//Create - POST
router.post("/products", authMiddleware, addProducts);

//Read
router.get("/products", authMiddleware, getProducts);
//by id >> dynamic id
router.get("/products/:id", authMiddleware, getProductsById);

//Update >> dynamic id
router.put("/products/:id", authMiddleware, updateProducts);

//Delete >> dynamic id
router.delete("/products/:id", authMiddleware, deleteProducts);

module.exports = router