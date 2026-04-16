import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />
      
      {/* Dialog */}
      <div className="relative glass w-full max-w-sm rounded-2xl border border-rose-500/20 shadow-2xl shadow-rose-900/20 overflow-hidden animate-slide-down">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{message}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-lg shadow-rose-500/20 transition-all active:scale-95"
            >
              Delete
            </button>
          </div>
        </div>
        
        {/* Close Button top right */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
