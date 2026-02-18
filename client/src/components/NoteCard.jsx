const NoteCard = ({ note, onDelete, onEdit }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("ar-SA", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="group relative flex h-full flex-col rounded-xl border border-border-subtle bg-bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
            <div className="my-2 flex items-start justify-between gap-4">
                <h3 className="text-lg font-black leading-tight text-text-base transition-colors group-hover:text-brand-primary">{note.title}</h3>
            </div>

            <hr className="mb-3 border-border-subtle opacity-50" />

            <article className="mb-6 grow overflow-hidden">
                <p className="text-sm text-text-base opacity-80 line-clamp-4 wrap-break-word">{note.details}</p>
            </article>

            <div className="flex gap-3 border-t border-border-subtle/30 pt-4">
                <button
                    onClick={() => onEdit(note)}
                    className="flex-1 rounded-xl bg-brand-primary/10 py-2.5 text-xs font-bold text-brand-primary transition-all hover:bg-brand-primary hover:text-white active:scale-95 cursor-pointer"
                >
                    تعديل
                </button>
                <button
                    onClick={() => onDelete(note._id)}
                    className="flex-1 rounded-xl bg-brand-secondary/10 py-2.5 text-xs font-bold text-brand-secondary transition-all hover:bg-brand-secondary hover:text-white active:scale-95 cursor-pointer"
                >
                    حذف
                </button>
            </div>

            <div className="absolute top-2 left-4 shrink-0 font-mono text-[10px] font-medium text-text-muted opacity-60">{formatDate(note.createdAt)}</div>
        </div>
    );
};

export default NoteCard;
