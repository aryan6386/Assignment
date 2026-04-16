import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-md w-full animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-white/40" />
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-white/10 transition-all duration-200 sm:text-sm backdrop-blur-md hover:bg-white/10"
      />
    </div>
  );
}
