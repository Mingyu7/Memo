import { useEffect, useState } from "react";
const KEY = "notes";

export default function useLocalNotes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : [{
      id: Date.now(),
      title: "환영합니다 👋",
      content: "이 메모는 예시입니다. 상단에서 새 메모를 작성해보세요!",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      pinned: true,
      tags: ["예시"],
    }];
  });

  useEffect(() => localStorage.setItem(KEY, JSON.stringify(notes)), [notes]);

  const createNote = ({ title, content, tags }) => {
    const now = Date.now();
    const note = { id: now, title, content, createdAt: now, updatedAt: now, pinned: false, tags: tags || [] };
    setNotes((prev) => [note, ...prev]);
    return note.id;
  };
  const getNote = (id) => notes.find((n) => n.id === Number(id));
  const updateNote = (id, patch) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === Number(id) ? { ...n, ...patch, updatedAt: Date.now() } : n))
    );
  };
  const deleteNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== Number(id)));
  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === Number(id) ? { ...n, pinned: !n.pinned } : n))
    );
  };

  return { notes, createNote, getNote, updateNote, deleteNote, togglePin };
}
