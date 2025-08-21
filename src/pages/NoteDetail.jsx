import { useNavigate, useParams, Link } from "react-router-dom";
import { fmtDate } from "../lib/format";
import { motion } from "framer-motion";

export default function NoteDetail({ getNote, deleteNote }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNote(id);

  if (!note) {
    return <div className="p-6 border rounded-2xl border-app bg-card">해당 메모가 없습니다. <Link className="underline" to="/notes">목록</Link></div>;
  }

  const onDelete = () => {
    if (confirm("정말 삭제할까요? 되돌릴 수 없습니다.")) {
      deleteNote(id);
      navigate("/notes");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="p-6 border rounded-2xl border-app bg-card"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="m-0 text-2xl font-semibold">{note.title || "(제목 없음)"}</h2>
        <div className="flex items-center gap-2">
          <Link to={`/edit/${note.id}`} className="px-4 py-2 transition border rounded-xl border-app bg-card hover:bg-accent-weak">수정</Link>
          <button onClick={onDelete} className="px-4 py-2 text-white rounded-xl" style={{ background: "#ef4444" }}>
            삭제
          </button>
        </div>
      </div>
      <div className="mb-4 text-sm text-muted">
        작성: {fmtDate(note.createdAt)} • 수정: {fmtDate(note.updatedAt)}
      </div>
      <div className="whitespace-pre-line">{note.content || "(내용 없음)"}</div>
      <div className="mt-4">
        <Link className="underline" to="/notes">← 목록으로</Link>
      </div>
    </motion.div>
  );
}