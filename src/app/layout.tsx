import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KanbanFlow – Task Management Board",
  description:
    "A beautiful, drag-and-drop Kanban board to manage your tasks across Pending, In Progress, and Completed stages. Built with Next.js and Tailwind CSS.",
  keywords: ["kanban", "task management", "productivity", "next.js"],
  authors: [{ name: "KanbanFlow" }],
  openGraph: {
    title: "KanbanFlow – Task Management Board",
    description: "Manage your tasks visually with a stunning Kanban board.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
