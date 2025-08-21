import { usePersistentState } from "../hooks/usePersistentState";
import NoteCard from "../components/NoteCard";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NotesList({ notes, togglePin }) {
  const [query, setQuery] = usePersistentState("notes_query", "");
  const [sort, setSort] = usePersistentState("notes_sort", "updated"); // created | updated | title
  const [tagFilter, setTagFilter] = usePersistentState("notes_tag_filter", null);
  const [searchScope, setSearchScope] = usePersistentState("notes_search_scope", "all");
  const [caseSensitive, setCaseSensitive] = usePersistentState("notes_case_sensitive", false);
  const [exactMatch, setExactMatch] = usePersistentState("notes_exact_match", false);

  const filtered = useMemo(() => {
    let arr = notes;

    let currentTagFilter = tagFilter;
    let currentQuery = query.trim();

    if (currentQuery.startsWith('#')) {
      currentTagFilter = currentQuery.substring(1);
      currentQuery = ''; // Clear query for title/content search if it's a tag search
    }

    // Filter by query
    if (currentQuery) {
      const q = caseSensitive ? currentQuery : currentQuery.toLowerCase();
      
      const check = (target) => {
        const t = caseSensitive ? target : target.toLowerCase();
        return exactMatch ? t === q : t.includes(q);
      }

      arr = arr.filter((n) => {
        const titleMatch = (searchScope === 'all' || searchScope === 'title') && n.title && check(n.title);
        const contentMatch = (searchScope === 'all' || searchScope === 'content') && n.content && check(n.content);
        return titleMatch || contentMatch;
      });
    }

    // Filter by tag
    if (currentTagFilter) {
      arr = arr.filter((n) => n.tags && n.tags.includes(currentTagFilter));
    }
    
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
  }, [notes, query, sort, tagFilter, searchScope, caseSensitive, exactMatch]);

  return (
    <><div className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-2 md:grid-cols-3">
        <input className="w-full px-3 py-2 transition border outline-none rounded-xl border-app bg-card placeholder:text-muted focus:ring-4 ring-accent"
          placeholder="검색: 제목/내용, #태그"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="w-full px-3 py-2 border rounded-xl border-app bg-card"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="updated">최근 수정순</option>
          <option value="created">최근 작성순</option>
          <option value="title">제목 순</option>
        </select>
      </div>

      <div className="hidden grid-cols-1 gap-2 mb-4 sm:grid-cols-2 sm:grid">
        {/* Search Scope Radios */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 border rounded-xl border-app bg-card">
          <span className="text-sm text-muted">검색 범위:</span>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="scope" value="all" checked={searchScope === 'all'} onChange={() => setSearchScope('all')} />
            전체
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="scope" value="title" checked={searchScope === 'title'} onChange={() => setSearchScope('title')} />
            제목
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="scope" value="content" checked={searchScope === 'content'} onChange={() => setSearchScope('content')} />
            내용
          </label>
        </div>
        {/* Search Option Checkboxes */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 border rounded-xl border-app bg-card">
          <span className="text-sm text-muted">검색 옵션:</span>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
            대소문자 구분
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={exactMatch} onChange={(e) => setExactMatch(e.target.checked)} />
            정확히 일치
          </label>
        </div>
      </div>

      {tagFilter && (
        <div className="mb-4">
          <button onClick={() => setTagFilter(null)} className="px-4 py-2 text-sm transition border rounded-xl border-app bg-card hover:bg-accent-weak">
            태그 필터 해제: #{tagFilter}
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="p-6 text-center border rounded-2xl border-app bg-card text-muted">
          메모가 없습니다. 우측 상단 <b>새 메모</b>로 작성해보세요.
        </div>
      ) : (
        <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
                        {filtered.map((n) => (
              <NoteCard key={n.id} note={n} togglePin={togglePin} setTagFilter={setTagFilter} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}