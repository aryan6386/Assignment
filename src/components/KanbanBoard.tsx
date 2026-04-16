"use client";

import { useState, useEffect, useCallback } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { Card, ColumnId, COLUMNS } from "@/types/kanban";
import { loadCards, saveCards } from "@/lib/storage";
import KanbanColumn from "./KanbanColumn";
import CardModal from "./CardModal";
import ConfirmDialog from "./ConfirmDialog";
import SearchBar from "./SearchBar";
import Header from "./Header";

export default function KanbanBoard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [deletingCard, setDeletingCard] = useState<Card | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadCards();
    setCards(stored);
    setIsLoaded(true);
  }, []);

  // Persist on every change
  useEffect(() => {
    if (isLoaded) {
      saveCards(cards);
    }
  }, [cards, isLoaded]);

  const filteredCards = useCallback(
    (columnId: ColumnId) => {
      return cards.filter(
        (c) =>
          c.columnId === columnId &&
          (c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    },
    [cards, searchQuery]
  );

  const handleCreateCard = (title: string, description: string) => {
    const now = new Date().toISOString();
    const newCard: Card = {
      id: uuidv4(),
      title,
      description,
      columnId: "pending",
      createdAt: now,
      updatedAt: now,
    };
    // Optimistic update
    setCards((prev) => [newCard, ...prev]);
    setShowCreateModal(false);
  };

  const handleEditCard = (title: string, description: string) => {
    if (!editingCard) return;
    setCards((prev) =>
      prev.map((c) =>
        c.id === editingCard.id
          ? { ...c, title, description, updatedAt: new Date().toISOString() }
          : c
      )
    );
    setEditingCard(null);
  };

  const handleDeleteCard = () => {
    if (!deletingCard) return;
    setCards((prev) => prev.filter((c) => c.id !== deletingCard.id));
    setDeletingCard(null);
  };

  const handleMoveCard = (cardId: string, direction: "forward" | "backward") => {
    const columnOrder: ColumnId[] = ["pending", "in-progress", "completed"];
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== cardId) return c;
        const idx = columnOrder.indexOf(c.columnId);
        const newIdx =
          direction === "forward"
            ? Math.min(idx + 1, columnOrder.length - 1)
            : Math.max(idx - 1, 0);
        return {
          ...c,
          columnId: columnOrder[newIdx],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newColumnId = destination.droppableId as ColumnId;
    setCards((prev) => {
      const card = prev.find((c) => c.id === draggableId);
      if (!card) return prev;

      const updated = prev.filter((c) => c.id !== draggableId);
      const movedCard = {
        ...card,
        columnId: newColumnId,
        updatedAt: new Date().toISOString(),
      };

      // Insert at correct position
      const columnCards = updated.filter((c) => c.columnId === newColumnId);
      const otherCards = updated.filter((c) => c.columnId !== newColumnId);
      columnCards.splice(destination.index, 0, movedCard);

      return [...otherCards, ...columnCards];
    });
  };

  const totalCards = cards.length;
  const completedCards = cards.filter((c) => c.columnId === "completed").length;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          totalCards={totalCards}
          completedCards={completedCards}
          onCreateCard={() => setShowCreateModal(true)}
        />

        <div className="px-4 md:px-8 py-4">
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Board */}
        <main className="flex-1 px-4 md:px-8 pb-8">
          {!isLoaded ? (
            <LoadingSkeleton />
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {COLUMNS.map((column, colIndex) => (
                  <KanbanColumn
                    key={column.id}
                    column={column}
                    cards={filteredCards(column.id)}
                    isSearching={searchQuery.length > 0}
                    animationDelay={colIndex * 0.1}
                    onEdit={setEditingCard}
                    onDelete={setDeletingCard}
                    onMove={handleMoveCard}
                  />
                ))}
              </div>
            </DragDropContext>
          )}
        </main>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CardModal
          mode="create"
          onSubmit={handleCreateCard}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {editingCard && (
        <CardModal
          mode="edit"
          initialTitle={editingCard.title}
          initialDescription={editingCard.description}
          onSubmit={handleEditCard}
          onClose={() => setEditingCard(null)}
        />
      )}

      {deletingCard && (
        <ConfirmDialog
          title="Delete Card"
          message={`Are you sure you want to delete "${deletingCard.title}"? This action cannot be undone.`}
          onConfirm={handleDeleteCard}
          onCancel={() => setDeletingCard(null)}
        />
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="glass rounded-2xl p-4 border border-white/5"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="h-6 w-32 shimmer rounded-lg mb-4" />
          {[0, 1, 2].map((j) => (
            <div key={j} className="glass rounded-xl p-4 mb-3 border border-white/5">
              <div className="h-4 w-3/4 shimmer rounded mb-2" />
              <div className="h-3 w-full shimmer rounded mb-1" />
              <div className="h-3 w-2/3 shimmer rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
