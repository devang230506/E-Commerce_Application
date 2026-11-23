const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
    try {
        //Authorization Header >> Bearer token 
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send({
                message: "Access Denied!!"
            })
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_Secret_Key);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).send({
            message: "Invalid Token",
        })
    }
}

module.exports = authMiddleware;