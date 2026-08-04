import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        // Check Existing User
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });

        }

        // Create User
        const user = await User.create({
            name,
            email,
            password
        });

        // Generate JWT
        const token = generateToken(user._id);

        res.status(201).json({

            success: true,
            message: "Registration Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};



export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });

        }

        // Find User
        const user = await User.findOne({ email }).select("+password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        // Compare Password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });

        }

        // Generate Token
        const token = generateToken(user._id);

        res.status(200).json({

            success: true,
            message: "Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};