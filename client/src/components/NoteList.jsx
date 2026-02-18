import NoteCard from "./NoteCard";

const NoteList = ({ notes, loading, onDelete, onEdit }) => {
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {[...Array(notes.length)].map((_, i) => (
                <div key={i} className="rounded-lg bg-bg-secondary animate-pulse p-4">
                    <div className="h-6 bg-text-muted/20 rounded mb-4"></div>
                    <div className="h-4 bg-text-muted/20 rounded mb-2"></div>
                    <div className="h-4 bg-text-muted/20 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-text-muted/20 rounded mb-4 w-4/6"></div>
                    <div className="h-10 bg-brand-primary/10 rounded"></div>
                </div>
            ))}
        </div>
    );
    return (
        <section className="md:col-span-8 lg:col-span-9 p-4 md:p-8 lg:p-12 min-h-screen transition-colors duration-300">
            <div className="mb-8 flex items-center gap-2 md:gap-3">
                <div className="relative flex size-3">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--brand-primary) opacity-75"></span>
                    <span class="relative inline-flex size-3 rounded-full bg-(--brand-primary)"></span>
                </div>
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black text-text-base">الملاحظات الأخيرة</h2>
                <span className="text-xs md:text-sm font-bold text-white bg-brand-primary px-2 md:px-3 py-1 md:py-1.5 rounded-full ml-auto">{notes.length}</span>
            </div>

            {loading ? (
                LoadingSkeleton()
            ) : notes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in duration-500">
                    {notes.map((note) => (
                        <NoteCard key={note._id} note={note} onDelete={onDelete} onEdit={onEdit} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-40 text-center">
                    <div className="relative mb-6">
                        <span className="text-8xl grayscale opacity-80">📂</span>
                        <div className="absolute -bottom-2 -right-4 h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                            <span className="text-brand-primary">!</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-black text-text-base mb-2">لا توجد ملاحظات حالياً</h3>
                    <p className="text-text-muted max-w-xs mx-auto">ابدأ بكتابة فكرة جديدة من القائمة الجانبية لتظهر ملاحظاتك هنا.</p>
                </div>
            )}
        </section>
    );
};

export default NoteList;
