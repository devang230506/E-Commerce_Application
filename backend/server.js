require('dotenv').config();
const express = require('express')
const app = express();
const PORT = process.env.PORT || 8000;
const connection = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');
app.use(cors());

connection();   //calling connection function for checking db was connected or not

//Home Route
app.get("/", (req, res) => {
    res.send("Welcome to backend E_Commerce Application");
})

app.use(express.json());

app.use(authRoutes); //Register a middleware
app.use(productRoutes);

//Start the server
//PORT
//Listen

app.listen(PORT, () => {
    console.log("Server was started. port listening on ", PORT);
})