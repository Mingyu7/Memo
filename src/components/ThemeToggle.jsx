import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../ThemeContext";

export default function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  const dark = mode === "dark";
  const reduce = useReducedMotion();
  return (
    <motion.button onClick={toggleMode}
      whileHover={reduce ? {} : { scale: 1.03 }}
      whileTap={reduce ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm transition border rounded-full border-app bg-card hover:bg-accent-weak"
      title="라이트/다크 전환"
    >
      <span className={`inline-block h-3 w-3 rounded-full ${dark ? "bg-yellow-300" : "bg-zinc-800"}`} />
      {dark ? "Dark" : "Light"}
    </motion.button>
  );
}