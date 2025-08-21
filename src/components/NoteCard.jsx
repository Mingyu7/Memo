import { Link } from "react-router-dom";
import { fmtDate } from "../lib/format";
import { motion } from "framer-motion";
import { HiOutlineMapPin, HiMapPin } from "react-icons/hi2";

export default function NoteCard({ note, togglePin, setTagFilter }) {
  return (
    <motion.div layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className="relative p-4 border rounded-2xl border-app bg-card"
    >
      <button
        className="absolute top-3 right-3 text-lg"
        onClick={() => togglePin(note.id)}
      >
        {note.pinned ? <HiMapPin /> : <HiOutlineMapPin />}
      </button>
      <h3 className="m-0 mb-2 text-base sm:text-lg font-semibold">
        <Link to={`/notes/${note.id}`} className="hover:underline">
          {note.title || "(제목 없음)"}
        </Link>
      </h3>
      <p className="m-0 mb-3 text-sm whitespace-pre-line text-muted">
        {note.content?.slice(0, 140) || "(내용 없음)"}{note.content?.length > 140 ? "…" : ""}
      </p>
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {note.tags.map(tag => (
            <button key={tag}
              onClick={() => setTagFilter(tag)}
              className="px-2 py-1 text-xs rounded-full bg-accent-weak text-accent hover:bg-accent hover:text-white transition"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
      <div className="text-xs text-muted">
        작성: {fmtDate(note.createdAt)} • 수정: {fmtDate(note.updatedAt)}
      </div>
    </motion.div>
  );
}
