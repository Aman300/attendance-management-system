const { errorResponse } = require("../../helper/error.response")
const admin = require("../../models/admin")


exports.createEmployee  =  async (req, res) =>{
    try{
        const isCreated = await admin.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        if(!isCreated){
            return errorResponse(res, 401, false, "someting went worng")
        }else{
            return errorResponse(res, 201, true, "Employee created successfull", isCreated)
        }

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }
}

