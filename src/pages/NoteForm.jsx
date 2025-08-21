import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

export default function NoteForm({ mode, createNote, getNote, updateNote }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = mode === "edit";
  const existing = editing ? getNote(id) : null;
  const [title, setTitle] = useState(existing?.title || "");
  const [content, setContent] = useState(existing?.content || "");
  const [error, setError] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (editing && !existing) navigate("/notes", { replace: true });
  }, [editing, existing, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      setError("제목 또는 내용을 입력해주세요.");
      return;
    }
    if (editing) {
      updateNote(id, { title: title.trim(), content: content.trim() });
      navigate(`/notes/${id}`);
    } else {
      const newId = createNote({ title: title.trim(), content: content.trim() });
      navigate(`/notes/${newId}`);
    }
  };

  return (
    <motion.form onSubmit={onSubmit}
      initial={reduce ? {} : { opacity: 0, y: 10 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className="p-6 border rounded-2xl border-app bg-card"
    >
      <h2 className="m-0 mb-3 text-2xl font-semibold">{editing ? "메모 수정" : "새 메모 작성"}</h2>

      <label className="text-sm text-muted">제목</label>
      <input className="w-full px-3 py-2 mt-1 transition border outline-none rounded-xl border-app bg-card focus:ring-4 ring-accent"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="메모 제목"
      />

      <label className="block mt-4 text-sm text-muted">내용</label>
      <textarea rows={10}
        className="w-full px-3 py-2 mt-1 transition border outline-none rounded-xl border-app bg-card focus:ring-4 ring-accent"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="메모 내용을 입력하세요"
      />

      {error && <div className="mt-2 text-sm" style={{ color: "var(--danger)" }}>{error}</div>}

      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 transition border rounded-xl border-app bg-card hover:bg-accent-weak">취소</button>
        <button className="px-4 py-2 font-medium text-white transition rounded-xl bg-accent hover:opacity-90 active:translate-y-px" type="submit">
          {editing ? "저장" : "작성"}
        </button>
      </div>
    </motion.form>
  );
}