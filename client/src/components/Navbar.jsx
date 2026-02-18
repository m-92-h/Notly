import { useState } from "react";
import LoginModal from "./LoginModal";
import { BookOpenText, Moon, Sun, CircleUserRound } from "lucide-react";

const Navbar = ({ isDarkMode, setIsDarkMode, user, onUserChange, onLoginSuccess, onLogout }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            onUserChange(null);
        }
    };

    const handleLoginSuccessModal = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        onLoginSuccess(userData, token);
        setIsLoginModalOpen(false);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 h-16 w-full border-b border-border-subtle bg-bg-surface px-4 shadow-sm backdrop-blur-md md:px-12">
                <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2 group">
                        <span className="text-2xl">
                            <BookOpenText className="text-brand-primary" />
                        </span>
                        <h1 className="text-lg font-black tracking-tight text-brand-primary md:text-xl">مذكراتي</h1>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 md:gap-6">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="flex h-10 w-10 items-center justify-center rounded-full text-xl transition-all hover:bg-bg-main active:scale-90 cursor-pointer"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun /> : <Moon />}
                        </button>

                        <div className="flex items-center gap-3 border-r border-border-subtle pr-3 md:gap-4 md:pr-6">
                            {user ? (
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className=" flex-col items-end flex">
                                        <span className="text-sm font-bold text-text-base leading-none">{user.name}</span>
                                        <button onClick={handleLogout} className="mt-1 text-xs font-medium text-brand-secondary opacity-80 hover:opacity-100 cursor-pointer">
                                            تسجيل خروج
                                        </button>
                                    </div>

                                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-brand-primary text-white shadow-soft flex items-center justify-center font-bold">
                                        <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-100 transition-opacity">{user.avatar || user.name.charAt(0)}</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center cursor-pointer">
                                    <CircleUserRound onClick={() => setIsLoginModalOpen(true)} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={handleLoginSuccessModal} />
        </>
    );
};

export default Navbar;
