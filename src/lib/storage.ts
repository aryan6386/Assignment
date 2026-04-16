import { Card } from "@/types/kanban";

const STORAGE_KEY = "kanban-cards";

export function loadCards(): Card[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultCards();
    return JSON.parse(raw) as Card[];
  } catch {
    return getDefaultCards();
  }
}

export function saveCards(cards: Card[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function getDefaultCards(): Card[] {
  const now = new Date().toISOString();
  return [
    {
      id: "default-1",
      title: "Design system setup",
      description: "Set up color tokens, typography, and spacing scale.",
      columnId: "completed",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "default-2",
      title: "API integration",
      description: "Connect frontend to the REST API endpoints.",
      columnId: "in-progress",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "default-3",
      title: "Write unit tests",
      description: "Add Jest tests for all utility functions.",
      columnId: "pending",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "default-4",
      title: "Deploy to production",
      description: "Configure CI/CD pipeline and deploy to Vercel.",
      columnId: "pending",
      createdAt: now,
      updatedAt: now,
    },
  ];
}
