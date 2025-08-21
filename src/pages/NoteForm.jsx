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
  const [tags, setTags] = useState(existing?.tags?.join(", ") || "");
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
    const parsedTags = tags.split(",").map(t => t.trim()).filter(t => t.length > 0);
    if (editing) {
      updateNote(id, { title: title.trim(), content: content.trim(), tags: parsedTags });
      navigate(`/notes/${id}`);
    } else {
      const newId = createNote({ title: title.trim(), content: content.trim(), tags: parsedTags });
      navigate(`/notes/${newId}`);
    }
  };

  return (
    <motion.form onSubmit={onSubmit}
      initial={reduce ? {} : { opacity: 0, y: 10 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className="p-4 sm:p-6 border rounded-2xl border-app bg-card"
    >
      <h2 className="m-0 mb-3 text-xl font-semibold sm:text-2xl">{editing ? "메모 수정" : "새 메모 작성"}</h2>

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
      <div className="mt-1 text-sm text-right text-muted">
        글자 수: {content.length}
      </div>

      <label className="block mt-4 text-sm text-muted">태그 (쉼표로 구분)</label>
      <input className="w-full px-3 py-2 mt-1 transition border outline-none rounded-xl border-app bg-card focus:ring-4 ring-accent"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="예: 일상, 코딩, 아이디어"
      />

      {error && <div className="mt-2 text-sm" style={{ color: "var(--danger)" }}>{error}</div>}

      <div className="flex flex-col-reverse gap-2 mt-4 sm:flex-row sm:justify-end">
        <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 transition border rounded-xl border-app bg-card hover:bg-accent-weak">취소</button>
        <button className="px-4 py-2 font-medium text-white transition rounded-xl bg-accent hover:opacity-90 active:translate-y-px" type="submit">
          {editing ? "저장" : "작성"}
        </button>
      </div>
    </motion.form>
  );
}