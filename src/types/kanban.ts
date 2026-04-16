export type ColumnId = "pending" | "in-progress" | "completed";

export interface Card {
  id: string;
  title: string;
  description: string;
  columnId: ColumnId;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: ColumnId;
  title: string;
  color: string;
  accent: string;
  icon: string;
}

export const COLUMNS: Column[] = [
  {
    id: "pending",
    title: "Pending",
    color: "from-amber-500/20 to-amber-600/10",
    accent: "border-amber-500/50",
    icon: "⏳",
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "from-blue-500/20 to-blue-600/10",
    accent: "border-blue-500/50",
    icon: "🚀",
  },
  {
    id: "completed",
    title: "Completed",
    color: "from-emerald-500/20 to-emerald-600/10",
    accent: "border-emerald-500/50",
    icon: "✅",
  },
];
