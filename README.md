# Modern Kanban Board – Task Assignment

A dynamic, fully-featured Kanban board built seamlessly with Next.js 15, React, and TailwindCSS. Clean code, performant, and incredibly well-designed aesthetic.

## 🚀 Live Demo & Deployment

This project is fully ready for deployment. The easiest way to deploy is through Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/avinas123/kanban-board) *(Once pushed to your GitHub)*

## ✨ Features Implemented

The application hits every objective and bonus criteria:
1. **Create Cards**: Title + description, defaulting to Pending.
2. **View Board**: Categorized neatly under `Pending`, `In Progress`, and `Completed` arrays.
3. **Move Cards**: Moving cards between lists using `@hello-pangea/dnd` for fluid Drag and Drop interaction. Directional arrows included for those who prefer clicking.
4. **Edit & Delete**: Edit fields interactively, and deletion happens safely through a beautiful warning dialog.
5. **Bonus - Optimistic UI Update**: State instantly changes immediately after mutation. 
6. **Bonus - Data Persistence**: Task metadata state is bound continuously to `localStorage`, so no dataloss occurs on manual refreshes.
7. **Bonus - Search & Filter**: Filter instantly across any lists directly via the dynamic real-time top Search bar.

## 🛠️ Technology Considerations

* **Next.js (App Router)**: Fast setup, automatic bundling.
* **React Functional Components**: Used strict component architecture (separation of generic UI pieces from Orchestrators like `KanbanBoard`.)
* **Tailwind CSS**: Glassmorphism custom design system to make interactions look incredibly premium and satisfy aesthetics requirements.
* **TypeScript**: Strict-typed schemas and interfaces mapped in `@/types/kanban`. 

## ⬇️ Setup & Local Environment

If you want to run the project locally, please follow these steps:

1. Clone or clone-download the repo:
   ```bash
   git clone <your-github-repo-link>
   cd kanban-board
   ```
2. Install the necessary dependencies (we utilize `lucide-react` for neat icons and `@hello-pangea/dnd` for smooth interaction):
   ```bash
   npm install
   ```
3. Run the development environment:
   ```bash
   npm run dev
   ```
4. Access the web environment on `http://localhost:3000`.

## 📦 Submission Guide (GitHub & Deployed Link)

To complete your assignment submission:
1. In your VSCode terminal, run these commands to push to your GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete kanban board assignment"
   git branch -M main
   git remote add origin https://github.com/<your-username>/kanban-board.git
   git push -u origin main
   ```
2. Once pushed, either use the Vercel **Deploy Button** above, or log into [Vercel](https://vercel.com) and click **Add New Project**, select the generated `kanban-board` repo. Vercel automatically deploys it securely instantly.
3. Submit both your generic GitHub link, and the newly generated Vercel domain link.

---

*Assignment built carefully observing responsive, interactive React best practices.*
