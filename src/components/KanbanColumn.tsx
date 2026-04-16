"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, Column } from "@/types/kanban";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  column: Column;
  cards: Card[];
  isSearching: boolean;
  animationDelay: number;
  onEdit: (card: Card) => void;
  onDelete: (card: Card) => void;
  onMove: (cardId: string, direction: "forward" | "backward") => void;
}

export default function KanbanColumn({
  column,
  cards,
  isSearching,
  animationDelay,
  onEdit,
  onDelete,
  onMove,
}: KanbanColumnProps) {
  return (
    <div
      className="flex flex-col h-[calc(100vh-180px)] animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className={`glass rounded-2xl p-4 flex flex-col h-full border ${column.accent} shadow-lg relative overflow-hidden group`}>
        {/* Subtle background glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${column.color} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
        
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl drop-shadow-md">{column.icon}</span>
            <h2 className="font-semibold text-white/90">{column.title}</h2>
          </div>
          <div className="bg-white/10 px-2.5 py-0.5 rounded-full text-xs font-medium text-white/70 border border-white/5">
            {cards.length}
          </div>
        </div>

        <Droppable droppableId={column.id} isDropDisabled={isSearching}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 overflow-y-auto overflow-x-hidden space-y-3 p-1 -m-1 rounded-xl transition-colors duration-200 ${
                snapshot.isDraggingOver ? "bg-white/5" : ""
              }`}
            >
              {cards.map((card, index) => (
                <Draggable
                  key={card.id}
                  draggableId={card.id}
                  index={index}
                  isDragDisabled={isSearching}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={snapshot.isDragging ? "card-dragging z-50" : ""}
                      style={provided.draggableProps.style}
                    >
                      <KanbanCard
                        card={card}
                        onEdit={() => onEdit(card)}
                        onDelete={() => onDelete(card)}
                        onMoveForward={() => onMove(card.id, "forward")}
                        onMoveBackward={() => onMove(card.id, "backward")}
                        disableMoveBackward={column.id === "pending"}
                        disableMoveForward={column.id === "completed"}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
              {cards.length === 0 && !snapshot.isDraggingOver && (
                <div className="h-32 flex flex-col items-center justify-center text-white/30 border-2 border-dashed border-white/10 rounded-xl m-2 animate-fade-in">
                  <span className="text-sm">No tasks here</span>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
