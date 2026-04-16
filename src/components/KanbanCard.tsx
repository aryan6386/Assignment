import { Card } from "@/types/kanban";
import { Edit2, Trash2, GripVertical, ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface KanbanCardProps {
  card: Card;
  onEdit: () => void;
  onDelete: () => void;
  onMoveForward: () => void;
  onMoveBackward: () => void;
  disableMoveForward: boolean;
  disableMoveBackward: boolean;
  isDragging: boolean;
}

export default function KanbanCard({
  card,
  onEdit,
  onDelete,
  onMoveForward,
  onMoveBackward,
  disableMoveForward,
  disableMoveBackward,
  isDragging,
}: KanbanCardProps) {
  const date = new Date(card.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`group bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 cursor-grab hover:border-white/20 transition-all duration-200 ${
        isDragging ? "shadow-2xl ring-2 ring-violet-500/50" : "hover:shadow-lg"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 max-w-[85%]">
          <div className="mt-1 text-white/30 group-hover:text-white/50 cursor-grab active:cursor-grabbing">
            <GripVertical className="w-4 h-4" />
          </div>
          <h3 className="font-medium text-white break-words line-clamp-2 leading-tight">
            {card.title}
          </h3>
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            title="Edit"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {card.description && (
        <p className="text-sm text-white/60 mb-4 line-clamp-3 pl-6">
          {card.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 pl-6">
        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <Clock className="w-3.5 h-3.5" />
          <span>{date}</span>
        </div>
        
        {/* Mobile controls for moving if drag and drop is not ideal */}
        <div className="flex items-center gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveBackward();
            }}
            disabled={disableMoveBackward}
            className="p-1 text-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveForward();
            }}
            disabled={disableMoveForward}
            className="p-1 text-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 rounded"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
