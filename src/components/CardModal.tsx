import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CardModalProps {
  mode: "create" | "edit";
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (title: string, description: string) => void;
  onClose: () => void;
}

export default function CardModal({
  mode,
  initialTitle = "",
  initialDescription = "",
  onSubmit,
  onClose,
}: CardModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    onSubmit(title.trim(), description.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative glass w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden animate-slide-down">
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
          <h2 className="text-xl font-semibold text-white">
            {mode === "create" ? "Create New Task" : "Edit Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-1.5">
              Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              className={`w-full px-4 py-2.5 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all ${
                error ? "border-rose-500/50" : "border-white/10 focus:border-violet-500/50"
              }`}
              placeholder="e.g. Design the hero section"
              autoFocus
            />
            {error && <p className="mt-1.5 text-sm text-rose-400">{error}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none"
              placeholder="Add more details about this task..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-xl shadow-lg shadow-violet-500/25 transition-all active:scale-95"
            >
              {mode === "create" ? "Create Task" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
