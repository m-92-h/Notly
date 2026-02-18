import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import EditModal from "./components/EditModal";
import { applyDarkMode, getDarkModePreference } from "./services/theme";
import { useNotes } from "./services/api";

const App = () => {
    const { notes, loading, fetchNotes, createNote, updateNote, deleteNote } = useNotes();
    const [isDarkMode, setIsDarkMode] = useState(() => getDarkModePreference());
    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        applyDarkMode(isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        if (savedUser && savedToken) {
            try {
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
            } catch (error) {
                console.error("خطأ في قراءة بيانات المستخدم:", error);
            }
        }
    }, []);

    // جلب ملاحظات المستخدم عند تسجيل دخوله
    useEffect(() => {
        if (token) {
            fetchNotes("", token);
        }
    }, [token]);

    const handleSaveNote = async (id, updatedData) => {
        await updateNote(id, updatedData, token);
        setIsModalOpen(false);
    };

    const handleAddNote = async (noteData) => {
        await createNote(noteData, token);
    };

    const handleDeleteNote = async (id) => {
        await deleteNote(id, token);
    };

    const handleSearch = async (q) => {
        await fetchNotes(q, token);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
    };

    const handleLoginSuccess = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
    };

    return (
        <div className="min-h-screen bg-bg-main transition-colors duration-300">
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} onUserChange={setUser} onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />

            {user && token ? (
                <main className="mx-auto max-w-400 grid grid-cols-1 md:grid-cols-12 min-h-[calc(100-4rem)]">
                    <Sidebar onAdd={handleAddNote} onSearch={handleSearch} />

                    <NoteList
                        notes={notes}
                        loading={loading}
                        onDelete={handleDeleteNote}
                        onEdit={(note) => {
                            setSelectedNote(note);
                            setIsModalOpen(true);
                        }}
                    />
                </main>
            ) : (
                <main className="mx-auto max-w-400 grid grid-cols-1 md:grid-cols-12 min-h-[calc(100-4rem)]">
                    <Sidebar onAdd={handleAddNote} onSearch={handleSearch} />

                    <section className="md:col-span-8 lg:col-span-9 p-4 md:p-8 lg:p-12 min-h-screen transition-colors duration-300 flex flex-col items-center justify-center text-center">
                        <div className="relative mb-6">
                            <span className="text-8xl grayscale">🔒</span>
                        </div>
                        <h3 className="text-xl font-black text-text-base mb-2">الرجاء تسجيل الدخول</h3>
                        <p className="text-text-muted max-w-xs mx-auto">قم بتسجيل الدخول أو إنشاء حساب جديد لمشاهدة ملاحظاتك وإدارتها.</p>
                    </section>
                </main>
            )}

            {/* Edit Modal */}
            {isModalOpen && <EditModal note={selectedNote} onClose={() => setIsModalOpen(false)} onSave={handleSaveNote} />}
        </div>
    );
};

export default App;
