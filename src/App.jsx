import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import useLocalNotes from "./hooks/useLocalNotes";
import Header from "./components/Header";
import NotesList from "./pages/NotesList";
import NoteDetail from "./pages/NoteDetail";
import NoteForm from "./pages/NoteForm";

export default function App() {
  const notesApi = useLocalNotes();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app text-app">
      <div className="max-w-4xl px-4 py-8 mx-auto">
        <Header onNew={() => navigate("/new")} />
        <Routes>
          <Route path="/notes" element={<NotesList {...notesApi} />} />
          <Route path="/" element={<Navigate to="/notes" replace />} />          
          <Route path="/notes/:id" element={<NoteDetail {...notesApi} />} />
          <Route path="/new" element={<NoteForm mode="create" {...notesApi} />} />
          <Route path="/edit/:id" element={<NoteForm mode="edit" {...notesApi} />} />
          <Route path="*" element={<p className="text-muted">페이지를 찾을 수 없습니다.</p>} />
        </Routes>
      </div>
    </div>
  );
}