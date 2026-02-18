import { useState } from "react";
import { X } from "lucide-react";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const url = isLogin ? `${API_BASE_URL}/users/login` : `${API_BASE_URL}/users/register`;

            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : {
                      name: formData.name,
                      email: formData.email,
                      password: formData.password,
                      confirmPassword: formData.confirmPassword,
                  };

            if (!isLogin && formData.password !== formData.confirmPassword) {
                setError("كلمات المرور غير متطابقة");
                setLoading(false);
                return;
            }

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || result.message || "حدث خطأ");
            }

            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.data));

            resetForm();
            onLoginSuccess(result.data, result.token);
            onClose();
        } catch (err) {
            setError(err.message || "حدث خطأ");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setError("");
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        resetForm();
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-[clamp(300px,50vw,450px)] bg-bg-surface rounded-[clamp(8px,4vw,16px)] modal-scrollbar shadow-soft overflow-auto custom-scrollbar animate-in zoom-in-95 duration-200 border border-border-subtle">
                {/* Header */}
                <div className="p-8 pb-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-[clamp(16px,4vw,24px)] font-black text-brand-primary">{isLogin ? "مرحباً بك مجدداً" : "إنشاء حساب جديد"}</h2>
                    </div>
                    <X className="cursor-pointer" onClick={onClose} />
                </div>

                <div className="p-8 pt-2">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-brand-secondary/10 text-brand-secondary p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2 border border-brand-secondary/20 animate-shake">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-[clamp(5px,3vw,14px)]">
                        {!isLogin && (
                            <div className="space-y-1">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="الاسم الكامل"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full py-[clamp(4px,2vw,10px)] px-4 text-[clamp(12px,4vw,14px)] rounded-lg bg-bg-main border border-border-subtle text-text-base outline-none transition-all"
                                />
                            </div>
                        )}

                        <input
                            type="email"
                            name="email"
                            placeholder="البريد الإلكتروني"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full py-[clamp(4px,2vw,10px)] px-4 text-[clamp(12px,4vw,14px)] rounded-lg bg-bg-main border border-border-subtle text-text-base outline-none transition-all"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="كلمة المرور"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full py-[clamp(4px,2vw,10px)] px-4 text-[clamp(12px,4vw,14px)] rounded-lg bg-bg-main border border-border-subtle text-text-base outline-none transition-all"
                        />

                        {!isLogin && (
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="تأكيد كلمة المرور"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                className="w-full py-[clamp(4px,2vw,10px)] px-4 text-[clamp(12px,4vw,14px)] rounded-lg bg-bg-main border border-border-subtle text-text-base outline-none transition-all"
                            />
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-primary text-white py-[clamp(4px,2vw,10px)] text-[clamp(14px,4vw,14px)] rounded-lg font-bold shadow-soft hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex justify-center items-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    جاري المعالجة...
                                </>
                            ) : isLogin ? (
                                "تسجيل الدخول"
                            ) : (
                                "بدء الاستخدام"
                            )}
                        </button>
                    </form>

                    {/* Footer Switcher */}
                    <div className="mt-[clamp(12px,4vw,24px)] text-center border-t border-border-subtle pt-[clamp(12px,4vw,24px)]">
                        <p className="text-text-muted text-[clamp(12px,4vw,14px)]">
                            {isLogin ? "لا تملك حساباً بعد؟" : "لديك حساب بالفعل؟"}
                            <button onClick={toggleMode} className="text-brand-primary font-bold hover:underline ms-2 cursor-pointer">
                                {isLogin ? "أنشئ حسابك الآن" : "سجل دخولك"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
