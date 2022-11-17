const createHttpError = require("http-errors")
const authService = require("../services/authService")



module.exports = {
    signIn : async (req, res) => {
        const authData = await authService.signIn(req.body.email)

        if(!authData.success)
            createHttpError(500, "Internal server error");
        
        res.json(authData.data)
    }
}