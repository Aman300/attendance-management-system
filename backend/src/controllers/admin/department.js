const { errorResponse } = require("../../helper/error.response")
const department = require("../../models/department")

exports.createDepartment  =  async (req, res) =>{
    try{
        const isDeparment = await department.create({
            department_name: req.body.department_name,
        })
        if(!isDeparment){
            return errorResponse(res, 401, false, "someting went worng admin account not register")
        }else{
            return errorResponse(res, 201, true, "Department created successfull", isDeparment)
        }

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }
}
exports.getDepartment  =  async (req, res) =>{
    try{
        const isDeparment = await department.find({})
        if(!isDeparment){
            return errorResponse(res, 401, false, "someting went worng admin account not register")
        }else{
            return errorResponse(res, 201, true, "Department fetch successfull", isDeparment)
        }

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }
}
