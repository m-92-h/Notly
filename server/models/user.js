import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "الاسم مطلوب"],
        trim: true,
        minlength: [2, "الاسم يجب أن يكون على الأقل حرفين"],
    },
    email: {
        type: String,
        required: [true, "البريد الإلكتروني مطلوب"],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "البريد الإلكتروني غير صحيح"],
    },
    password: {
        type: String,
        required: [true, "كلمة المرور مطلوبة"],
        minlength: [6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"],
    },
    avatar: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("User", UserSchema);
