const mongoose = require("mongoose");
const Product = require('./../models/productModel');

const getDummyProducts = (req, res) => {
    const products = [
        {
            id: 1,
            "name": "Wireless Headphones",
            "price": 2999,
            "category": "Elctronics"
        },
        {
            id: 2,
            "name": "Running Shoes",
            "price": 1999,
            "category": "Footwear"
        }
    ]
    res.status(200).send({
        message: "products featch successfully",
        loggedInUser: req.user,
        products
    })
}

//CRUD
//Create 
const addProducts = async (req, res) => {
    try {
        //req.body
        const { name, description, price } = req.body;

        if (!name || !description || price === undefined || price === null) {
            return res.status(400).send({
                message: "name, description, and price are required."
            });
        }

        const product = new Product({
            name,
            description,
            price
        });
        //save() - await
        await product.save();
        res.status(201).send({
            message: "Product added successfully.",
            loggedInUser: req.user.id,
            product
        });
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
};

//Read
const getProducts = async (req, res) => {
    //find() >> Model await
    try {
        const products = await Product.find()
        res.status(201).send({
            message: "All product fetch successfully",
            loggedInUser: req.user.id,
            products
        })
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

//products by id >> req.params.id
const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check for valid MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                message: "Invalid product ID format"
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }

        res.status(200).send({
            message: "Product fetch successfully of ID",
            loggedInUser: req.user?.id,
            product
        });
    } catch (e) {
        if (e.name === "CastError") {
            return res.status(400).send({
                message: "Invalid product ID format"
            });
        }
        res.status(500).send({
            message: e.message
        });
    }
};

//Update
const updateProducts = async (req, res) => {
    //dynamic id >> req.params.id + req.body
    try {
        const { id } = req.params;

        // Check for valid MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                message: "Invalid product ID format"
            });
        }

        // Verify request body is provided
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({
                message: "Update data must be provided"
            });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }

        res.status(200).send({
            message: "Product updated successfully",
            loggedInUser: req.user?.id,
            product
        });
    } catch (e) {
        if (e.name === "CastError" || e.name === "ValidationError") {
            return res.status(400).send({
                message: e.message
            });
        }
        res.status(500).send({
            message: e.message
        });
    }
};

//Delete
const deleteProducts = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).send({
            message: "Product deleted successfully",
            loggedInUser: req.user?.id,
            product
        })
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}


module.exports = { getDummyProducts, getProducts, addProducts, getProductsById, updateProducts, deleteProducts }