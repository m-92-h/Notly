const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // التأكد من أن المستخدم مصرح به
            if (!req.user) {
                return res.status(401).json({
                    error: "يجب تسجيل الدخول أولاً",
                });
            }

            // التحقق من أن دور المستخدم موجود في قائمة الأدوار المسموح بها
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    error: "ليس لديك صلاحية للوصول إلى هذا المورد",
                    requiredRole: allowedRoles,
                    userRole: req.user.role,
                });
            }

            next();
        } catch (error) {
            res.status(500).json({
                error: "خطأ في التحقق من الصلاحيات",
            });
        }
    };
};

export default authorize;
