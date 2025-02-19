import jwt from "jsonwebtoken";

const cartAuth = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default cartAuth;
