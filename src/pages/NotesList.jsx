import NoteCard from "../components/NoteCard";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NotesList({ notes, togglePin }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("updated"); // created | updated | title

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = !q
      ? notes
      : notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q)
        );
    
    const pinned = arr.filter((n) => n.pinned);
    const unpinned = arr.filter((n) => !n.pinned);

    if (sort === "created") {
      pinned.sort((a, b) => b.createdAt - a.createdAt);
      unpinned.sort((a, b) => b.createdAt - a.createdAt);
    }
    if (sort === "updated") {
      pinned.sort((a, b) => b.updatedAt - a.updatedAt);
      unpinned.sort((a, b) => b.updatedAt - a.updatedAt);
    }
    if (sort === "title") {
      pinned.sort((a, b) => a.title.localeCompare(b.title));
      unpinned.sort((a, b) => a.title.localeCompare(b.title));
    }
    return [...pinned, ...unpinned];
  }, [notes, query, sort]);

  return (
    <><div className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-3">
        <input className="px-3 py-2 transition border outline-none rounded-xl border-app bg-card placeholder:text-muted focus:ring-4 ring-accent"
          placeholder="검색: 제목/내용"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="px-3 py-2 border rounded-xl border-app bg-card"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="updated">최근 수정순</option>
          <option value="created">최근 작성순</option>
          <option value="title">제목 순</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="p-6 text-center border rounded-2xl border-app bg-card text-muted">
          메모가 없습니다. 우측 상단 <b>새 메모</b>로 작성해보세요.
        </div>
      ) : (
        <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
                        {filtered.map((n) => (
              <NoteCard key={n.id} note={n} togglePin={togglePin} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}