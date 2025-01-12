import jwt from "jsonwebtoken";

const adminAuth =async (req, res, next) => {
    try{
        const {token} = req.headers;
        if (!token) {
            return res.json({success: false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: "Unauthorized" });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export default adminAuth;


