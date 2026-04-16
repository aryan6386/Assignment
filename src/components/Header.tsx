import { Plus, LayoutTemplate } from "lucide-react";

interface HeaderProps {
  totalCards: number;
  completedCards: number;
  onCreateCard: () => void;
}

export default function Header({ totalCards, completedCards, onCreateCard }: HeaderProps) {
  const progress = totalCards === 0 ? 0 : Math.round((completedCards / totalCards) * 100);

  return (
    <header className="glass sticky top-0 z-40 border-b border-white/10 px-4 md:px-8 py-4 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center p-0.5 shadow-lg shadow-violet-500/20">
            <div className="w-full h-full bg-gray-950/50 rounded-[10px] flex items-center justify-center">
              <LayoutTemplate className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              KanbanFlow
            </h1>
            <p className="text-xs text-white/50 font-medium">Manage your work beautifully</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm text-white/70 font-medium">
              {completedCards} of {totalCards} completed
            </span>
            <div className="w-32 h-1.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <button
            onClick={onCreateCard}
            className="flex items-center gap-2 bg-white text-gray-950 px-4 py-2 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}
