import { Link } from "react-router-dom";
import PalettePicker from "./PalettePicker";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

export default function Header({ onNew }) {
  return (
    <header className="flex items-center justify-between gap-3 mb-6">
      <motion.h1 className="text-3xl font-semibold tracking-tight"
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
      >
        🗒️ 메모장
      </motion.h1>
      <div className="flex items-center gap-2">
        <PalettePicker />
        <ThemeToggle />
        <button onClick={onNew}
          className="px-4 py-2 font-medium text-white transition rounded-xl bg-accent hover:opacity-90 active:translate-y-px"
        >
          새 메모
        </button>
        <Link to="/notes" className="px-4 py-2 transition border rounded-xl border-app bg-card hover:bg-accent-weak">
          목록
        </Link>
      </div>
    </header>
  );
}