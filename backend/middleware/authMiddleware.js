import jwt from "jsonwebtoken";
import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//     try {

//         let token;

//         if (
//             req.headers.authorization &&
//             req.headers.authorization.startsWith("Bearer")
//         ) {

//             token = req.headers.authorization.split(" ")[1];

//         }

//         if (!token) {

//             return res.status(401).json({
//                 success: false,
//                 message: "Access Denied. No Token Provided"
//             });

//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = await User.findById(decoded.id).select("-password");

//         next();

//     } catch (error) {

//         return res.status(401).json({

//             success: false,
//             message: "Invalid Token"

//         });

//     }

// };


export const protect = async (req, res, next) => {
    try {

        // console.log("Authorization Header =>", req.headers.authorization);

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // console.log("Extracted Token =>", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No Token Provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};