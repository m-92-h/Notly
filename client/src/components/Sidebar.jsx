import { useState } from "react";

const Sidebar = ({ onAdd, onSearch }) => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title, details });
        setTitle("");
        setDetails("");
    };

    return (
        <aside className="md:col-span-4 lg:col-span-3 bg-bg-surface p-6 border-l border-border-subtle transition-colors duration-300">
            <div className="md:sticky md:top-24 space-y-8">
                {/* Search Section */}
                <div className="space-y-3">
                    <label className="text-[clamp(12px,4vw,14px)] font-bold text-text-muted ms-2">ابحث عن ملاحظاتك</label>
                    <div className="flex flex-col gap-2 mt-1">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="اكتب العنوان هنا..."
                                className="w-full py-[clamp(4px,2vw,10px)] px-4 text-[clamp(12px,4vw,14px)] rounded-lg bg-bg-main border border-border-subtle text-text-base focus:ring-1 focus:ring-brand-primary focus:border-transparent outline-none transition-all placeholder:text-text-muted/50"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onSearch(search)}
                                className="flex-1 py-[clamp(4px,2vw,10px)] px-4 text-[clamp(12px,4vw,14px)] rounded-lg bg-brand-primary text-white hover:opacity-90 transition-all font-bold shadow-soft active:scale-95 cursor-pointer"
                            >
                                بحث
                            </button>
                            {search && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        onSearch("");
                                    }}
                                    className="py-[clamp(4px,2vw,10px)] px-4 text-[clamp(12px,4vw,14px)] rounded-lg bg-border-subtle text-text-base hover:bg-red-500 hover:text-white transition-all font-bold cursor-pointer"
                                >
                                    مسح
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Entry Card */}
                <div className="bg-bg-main p-6 rounded-2xl border border-brand-primary/20 dark:border-brand-primary/10">
                    <h2 className="font-bold mb-4 flex items-center gap-2 text-brand-primary">
                        <span className="text-[clamp(12px,4vw,14px)]">✨</span> إضافة ملاحظة جديدة
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="عنوان الملاحظة"
                            className="w-full py-[clamp(4px,2vw,10px)] px-4 text-[clamp(12px,4vw,14px)] rounded-lg bg-bg-surface border border-border-subtle text-text-base placeholder:text-text-muted/50 focus:border-brand-primary outline-none transition-colors"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="تفاصيل الملاحظة..."
                            rows="4"
                            className="w-full py-[clamp(4px,2vw,10px)] px-4 text-[clamp(12px,4vw,14px)] rounded-lg bg-bg-surface border border-border-subtle text-text-base placeholder:text-text-muted/50 focus:border-brand-primary outline-none custom-scrollbar resize-none transition-colors"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-brand-primary text-white text-[clamp(12px,4vw,14px)] py-[clamp(4px,2vw,10px)] rounded-lg font-bold shadow-soft hover:brightness-110 transform active:scale-[0.98] transition-all cursor-pointer"
                        >
                            إضافة إلى القائمة
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
