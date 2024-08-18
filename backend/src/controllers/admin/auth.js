const { errorResponse } = require("../../helper/error.response")
const admin = require("../../models/admin")
const jwt = require('jsonwebtoken');


exports.adminRegister  =  async (req, res) =>{
    try{
        const isRegister = await admin.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        if(!isRegister){
            return errorResponse(res, 401, false, "someting went worng admin account not register")
        }else{
            return errorResponse(res, 201, true, "Admin register successfull", isRegister)
        }

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }
}

exports.adminLogin = async (req, res) => {
    try {
        // Check if admin exists
        let isLogin = await admin.findOne({
            email: req.body.email,
            password: req.body.password
        });

        // If no admin found, return error
        if (!isLogin) {
            return errorResponse(res, 400, false, "Invalid email or password");
        }

        // Generate token
        const token = jwt.sign(
            { id: isLogin._id, email: isLogin.email }, // Payload
            "secretKey", // Secret key
            { expiresIn: '1h' } // Options: token expiration time
        );

        // Send response with token
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            data: isLogin
        });

    } catch (e) {
        return errorResponse(res, 500, false, e.message);
    }
}

