import jwt from "jsonwebtoken";

function verifyToken(req, res, next){
    const header = req.header("Authorization");
    const token = header && header.startWith("Bearer ") ? header.slice(7) : null;

    if(!token){
        return res.status(401).json({
            success: false,
            message: "No token provided."
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next(); 
    } catch(err){
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
}

export default verifyToken;