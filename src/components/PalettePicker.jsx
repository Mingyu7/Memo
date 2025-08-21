import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../ThemeContext";

const items = [
  { key:"blue",   label:"Blue",   dot:"bg-blue-500" },
  { key:"green",  label:"Green",  dot:"bg-emerald-500" },
  { key:"purple", label:"Purple", dot:"bg-violet-500" },
  { key:"pink",   label:"Pink",   dot:"bg-pink-500" },
  { key:"orange", label:"Orange", dot:"bg-amber-500" },
];

export default function PalettePicker() {
  const { palette, setPalette } = useTheme();
  const reduce = useReducedMotion();
  return (
    <div className="inline-flex items-center gap-2">
      {items.map((p) => (
        <motion.button key={p.key}
          onClick={() => setPalette(p.key)}
          whileHover={reduce ? {} : { y: -1 }}
          whileTap={reduce ? {} : { scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`flex items-center gap-2 rounded-full border border-app bg-card px-3 py-2 text-sm hover:bg-accent-weak transition ${
            palette === p.key ? "ring-accent" : ""
          }`}
          title={`${p.label} 팔레트`}
          layout
        >
          <span className={`h-3 w-3 rounded-full ${p.dot}`} />
          {p.label}
        </motion.button>
      ))}
    </div>
  );
}