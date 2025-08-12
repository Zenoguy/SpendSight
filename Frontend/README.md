# 💸 SpendSight

**Your Finances. Decoded.**  
A smart, intuitive frontend for transforming raw bank statements into actionable insights — all in a few clicks.

🚀 [Live Demo](https://guileless-pie-4be968.netlify.app/)  
📦 Frontend Repo: [Zenoguy/SpendSight-](https://github.com/Zenoguy/SpendSight-)

---

## 📖 Overview

**SpendSight** helps individuals and small businesses make sense of their bank statement PDFs. Our clean, React + TypeScript-powered frontend allows users to:

- Upload bank statements in PDF format
- Preview parsed data tables
- Visualize transactions by category
- View smart summaries and trend insights *(coming soon)*
- Seamlessly switch between Personal and Business modes

⚡ Designed for speed, clarity, and simplicity — SpendSight brings visibility to your financial activity without spreadsheet headaches.

---

## 🧠 Core Features

| Feature                      | Description |
|-----------------------------|-------------|
| 🗂️ PDF Upload               | Upload your bank statement securely |
| 📊 Table View               | Clean display of parsed transactions |
| 📈 Charts (in progress)     | Visual breakdown of categories |
| 🧭 Modes                    | Switch between Personal and Business dashboards |
| 💡 AI Insight Panel (WIP)   | Future smart financial advice using LLMs |

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Routing**: React Router DOM
- **Deployment**: Netlify

---

## 📂 Project Structure (Simplified)

📦 src/
├── components/              # UI components (Dashboard, Login, Sidebar, etc.)
│   ├── Dashboard.tsx
│   ├── Insights.tsx
│   ├── Login.tsx
│   ├── Navigation.tsx
│   ├── Pricing.tsx
│   ├── Settings.tsx
│   ├── Sidebar.tsx
│   ├── Signup.tsx
│   └── UploadStatement.tsx
│
├── contexts/                # React context providers
│   └── ThemeContext.tsx
│
├── data/                    # Mock or static data
│   └── mockData.ts
│
├── types/                   # TypeScript types
│
├── App.tsx                  # Main app component
├── index.css                # Global styles
├── main.tsx                 # Application entry point
├── vite-env.d.ts            # Vite-specific TypeScript types
