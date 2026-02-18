import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { expiresIn } from "../config/settings.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // التحقق من المدخلات
        if (!name) {
            return res.status(400).json({ error: "اسم المستخدم مطلوب" });
        }
        if (!email) {
            return res.status(400).json({ error: "البريد الإلكتروني مطلوب" });
        }
        if (!password) {
            return res.status(400).json({ error: "كلمة المرور مطلوبة" });
        }

        // التحقق من وجود المستخدم
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "البريد الإلكتروني مستخدم بالفعل" });
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // إنشاء المستخدم
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar: name.charAt(0).toUpperCase(),
            role: "user",
        });

        // إنشاء JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn,
        });

        res.status(201).json({
            message: "تم التسجيل بنجاح",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            },
            token,
        });
    } catch (err) {
        res.status(500).json({
            message: "حدث خطأ أثناء التسجيل",
            error: err.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // التحقق من المدخلات
        if (!email) {
            return res.status(400).json({ error: "البريد الإلكتروني مطلوب" });
        }
        if (!password) {
            return res.status(400).json({ error: "كلمة المرور مطلوبة" });
        }

        // البحث عن المستخدم
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "المستخدم غير موجود" });
        }

        // التحقق من كلمة المرور
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "كلمة المرور غير صحيحة" });
        }

        // إنشاء JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            message: "تم تسجيل الدخول بنجاح",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            },
            token,
        });
    } catch (err) {
        res.status(500).json({
            message: "حدث خطأ أثناء تسجيل الدخول",
            error: err.message,
        });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "المستخدم غير موجود" });
        }
        res.status(200).json({
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            message: "حدث خطأ",
            error: err.message,
        });
    }
};
