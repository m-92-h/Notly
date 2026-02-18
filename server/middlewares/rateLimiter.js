import rateLimit from "express-rate-limit";

// All links
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: "عدد الطلبات كبير جدًا، يرجى المحاولة مرة أخرى لاحقًا",
    standardHeaders: true,
    legacyHeaders: false,
});

// Login/Register
export const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "محاولات دخول كثيرة، تم حظرك مؤقتاً",
    standardHeaders: true,
    legacyHeaders: false,
});