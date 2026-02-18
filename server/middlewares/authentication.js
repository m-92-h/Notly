import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                error: "التوكن غير موجود، يرجى تسجيل الدخول",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                error: "المستخدم غير موجود",
            });
        }

        // حفظ بيانات المستخدم في الطلب
        req.user = user;
        req.userId = decoded.userId;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                error: "انتهت صلاحية التوكن",
            });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                error: "توكن غير صحيح",
            });
        }
        res.status(500).json({
            error: "خطأ في التحقق من التوكن",
        });
    }
};

export default authMiddleware;
