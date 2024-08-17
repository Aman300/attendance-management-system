const { errorResponse } = require("../../helper/error.response")
const admin = require("../../models/admin")


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
exports.adminLogin  =  async (req, res) =>{

    try{
        let isLogin = await admin.findOne({
            email: req.body.email,
            password: req.body.password
        })
        if(!isLogin){
            return errorResponse(res, 400, false, "Something went wrong!!!")
        }else{
            return errorResponse(res, 200, true, "Login successfull", isLogin)
        }
        

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }
}
