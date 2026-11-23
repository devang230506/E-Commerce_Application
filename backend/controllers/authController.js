//registerUser
//loginUser
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User.js');

const registerUser = async (req, res) => {
    //username, email, password getting from client -> req.body
    try {
        //Get data from client
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields (username, email, and password) are required."
            });
        }

        // Check if email already registered
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email already registered."
            });
        }

        // Check if username already taken
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                message: "Username already taken."
            });
        }

        //Password Hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        //create new user 
        const newUser = await User.create({
            username: username.trim(),
            email: email.trim(),
            password: hashedPassword
        });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    }
    catch (e) {
        if (e.code === 11000) {
            const field = Object.keys(e.keyPattern || {})[0] || "Field";
            return res.status(400).json({
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`
            });
        }
        res.status(500).json({
            message: e.message
        });
    }
};

const loginUser = async (req, res) => {
    //email, password >> client >> req.body
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        //user 
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                message: "User not found!!"
            });
        }
        //user is exist now match the password with db stored password - compare()
        const isMatch = await bcrypt.compare(password, user.password);
        //password not match
        if (!isMatch) {
            return res.status(401).send({
                message: "Invalid credentials"
            });
        }

        //Generate a token
        //payload, JWT_Secret_Key
        //jwt.sign()
        const token = jwt.sign({ id: user._id }, process.env.JWT_Secret_Key);

        res.status(200).send({
            message: "Login Successfull",
            token,
            "user": {
                username: user.username,
                email: user.email,
            }
        });

    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
};

module.exports = { registerUser, loginUser };
