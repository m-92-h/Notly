export const applyDarkMode = (isDark) => {
    if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("isDarkMode", "true");
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("isDarkMode", "false");
    }
};

// استرجاع حالة Dark Mode من localStorage
export const getDarkModePreference = () => {
    const saved = localStorage.getItem("isDarkMode");

    if (saved !== null) {
        return saved === "true";
    }

    // إذا لم يتم حفظ أي تفضيل، تحقق من تفضيل النظام
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return true;
    }

    return false;
};

// الاستماع لتغييرات تفضيل النظام
export const watchSystemTheme = (callback) => {
    if (!window.matchMedia) return;

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    darkModeQuery.addEventListener("change", (e) => {
        callback(e.matches);
    });

    return () => {
        darkModeQuery.removeEventListener("change", (e) => {
            callback(e.matches);
        });
    };
};
