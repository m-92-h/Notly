import Note from "../models/note.js";

// 1. get all notes with Search functionality
export const getNotes = async (req, res) => {
    try {
        const { search } = req.query;
        const userId = req.userId;

        let query = { userId };

        if (search) {
            query.title = new RegExp(`^${search}$`, "i");
        }

        const notes = await Note.find(query).sort({ createdAt: -1 }).lean();
        res.status(200).json({
            message: "تم جلب البيانات بنجاح",
            data: notes,
        });
    } catch (err) {
        res.status(500).json({
            message: "حدث خطأ داخلي في السيرفر",
            error: err.message,
        });
    }
};

// 2. Create new note
export const createNote = async (req, res) => {
    const { title, details } = req.body;
    const userId = req.userId;

    if (!title || title.trim() === "") {
        return res.status(400).json({ error: "العنوان مطلوب ولا يمكن أن يكون فارغاً" });
    }

    try {
        const newNote = await Note.create({ userId, title, details });
        res.status(201).json({
            message: "تم اضافة المهمة بنجاح",
            data: newNote,
        });
    } catch (err) {
        res.status(500).json({
            message: "حدث خطأ داخلي في السيرفر",
            error: err.message,
        });
    }
};

// 3. Update Note
export const updateNote = async (req, res) => {
    try {
        const userId = req.userId;
        const updatedTodo = await Note.findOneAndUpdate(
            { _id: req.params.id, userId },
            {
                title: req.body.title,
                details: req.body.details,
            },
            { new: true, runValidators: true },
        );

        if (!updatedTodo) return res.status(404).json({ message: "الملاحظة غير موجودة" });

        res.status(200).json({ message: "تم التحديث بنجاح", data: updatedTodo });
    } catch (err) {
        res.status(400).json({ message: "حدث خطأ أثناء التحديث", error: err.message });
    }
};

// 4. Delete Note
export const deleteNote = async (req, res) => {
    try {
        const userId = req.userId;
        await Note.findOneAndDelete({ _id: req.params.id, userId });
        res.status(200).json({ message: "تم الحذف بنجاح" });
    } catch (err) {
        res.status(500).json({
            message: "حدث خطأ داخلي في السيرفر",
            error: err.message,
        });
    }
};
