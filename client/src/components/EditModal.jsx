import { useState, useEffect } from "react";
import { X } from "lucide-react";

const EditModal = ({ note, onClose, onSave }) => {
    const [formData, setFormData] = useState({ title: "", details: "" });

    useEffect(() => {
        if (note) {
            setFormData({ title: note.title, details: note.details });
        }
    }, [note]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(note._id, formData);
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" onClick={onClose}></div>

            {/* Modal Card */}
            <div className="relative bg-bg-surface w-[95%] max-w-125 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200 border border-border-subtle flex flex-col mx-auto my-auto">
                <div className="py-2 px-4 md:p-6 border-b border-border-subtle flex justify-between items-center bg-bg-main/50">
                    <h2 className="text-[clamp(16px,4vw,20px)] font-black text-brand-primary">تعديل الملاحظة</h2>
                    <button onClick={onClose} className="p-1 md:p-2 rounded-full hover:bg-border-subtle duration-100 transition-all">
                        <X size={18} className="cursor-pointer" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-2 md:space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[clamp(12px,4vw,14px)] font-bold text-text-muted ms-1">العنوان</label>
                        <input
                            type="text"
                            className="w-full py-[clamp(4px,2vw,10px)] px-3 text-[clamp(12px,4vw,14px)] rounded-lg bg-bg-main border border-border-subtle text-text-base outline-none focus:ring-1 focus:ring-brand-primary/50 transition-all font-bold"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[clamp(12px,4vw,14px)] font-bold text-text-muted ms-1">التفاصيل</label>
                        <textarea
                            rows="4"
                            className="w-full py-[clamp(4px,2vw,10px)] px-3 text-[clamp(12px,4vw,14px)] rounded-lg bg-bg-main border border-border-subtle text-text-base outline-none focus:ring-1 focus:ring-brand-primary/50 transition-all resize-none custom-scrollbar"
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-[clamp(4px,2vw,10px)] text-[clamp(12px,4vw,14px)] rounded-2xl font-bold border border-border-subtle text-text-base hover:bg-bg-main transition-all cursor-pointer"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            className="flex-[1.5] bg-brand-primary text-white py-[clamp(4px,2vw,10px)] text-[clamp(12px,4vw,14px)] rounded-2xl font-bold shadow-soft hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                        >
                            تحديث
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
