import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = (token) => {
    const headers = { "Content-Type": "application/json" };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
};

// ===================== Custom Hook - إدارة الملاحظات =====================

export const useNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // جلب جميع الملاحظات بناءً على البحث
    const fetchNotes = async (query = "", token = null) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/notes?search=${query}`, {
                headers: getHeaders(token),
            });
            const result = await response.json();

            if (response.ok) {
                setNotes(result.data);
            } else {
                throw new Error(result.message || "خطأ في جلب البيانات");
            }
        } catch (error) {
            console.error("خطأ في جلب الملاحظات:", error);
        } finally {
            setLoading(false);
        }
    };

    // إضافة ملاحظة جديدة
    const createNote = async (noteData, token = null) => {
        try {
            const response = await fetch(`${API_BASE_URL}/notes`, {
                method: "POST",
                headers: getHeaders(token),
                body: JSON.stringify(noteData),
            });
            const result = await response.json();

            if (response.ok) {
                setNotes([result.data, ...notes]);
                return result.data;
            } else {
                throw new Error(result.message || "خطأ في إضافة الملاحظة");
            }
        } catch (error) {
            console.error("خطأ في الإضافة:", error);
            throw error;
        }
    };

    // تحديث ملاحظة موجودة
    const updateNote = async (id, updatedData, token = null) => {
        try {
            const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
                method: "PUT",
                headers: getHeaders(token),
                body: JSON.stringify(updatedData),
            });
            const result = await response.json();

            if (response.ok) {
                setNotes(notes.map((n) => (n._id === id ? result.data : n)));
                return result.data;
            } else {
                throw new Error(result.message || "خطأ في تحديث الملاحظة");
            }
        } catch (error) {
            console.error("خطأ في التحديث:", error);
            throw error;
        }
    };

    // حذف ملاحظة
    const deleteNote = async (id, token = null) => {
        try {
            const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
                method: "DELETE",
                headers: getHeaders(token),
            });

            if (response.ok) {
                setNotes(notes.filter((n) => n._id !== id));
                return true;
            } else {
                throw new Error("خطأ في حذف الملاحظة");
            }
        } catch (error) {
            console.error("خطأ في الحذف:", error);
            alert(error.message || "فشل حذف الملاحظة");
            throw error;
        }
    };

    return {
        notes,
        loading,
        setNotes,
        fetchNotes,
        createNote,
        updateNote,
        deleteNote,
    };
};

// ===================== دوال المستخدمين =====================

// تسجيل مستخدم جديد
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw new Error(result.error || result.message || "خطأ في التسجيل");
        }
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

// تسجيل دخول
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw new Error(result.error || result.message || "خطأ في تسجيل الدخول");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// الحصول على بيانات المستخدم الحالي
export const getCurrentUser = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
            headers: getHeaders(token),
        });
        const result = await response.json();

        if (response.ok) {
            return result.data;
        } else {
            throw new Error("خطأ في الحصول على بيانات المستخدم");
        }
    } catch (error) {
        console.error("Error getting current user:", error);
        throw error;
    }
};
