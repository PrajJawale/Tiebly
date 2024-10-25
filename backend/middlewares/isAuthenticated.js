import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message: "Usert Not authenticated",
                success: false
            })
        }

        //REOMOVE AWAIT FROM HERE 
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }

        req.id = decode.userId
        req.role = decode.role
        next() // ALLOW TO THE NEXT ROUTES  
    } catch (error) {
        console.log(error)
    }

}
export default isAuthenticated;