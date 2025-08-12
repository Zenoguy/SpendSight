# 💰 SpendSight

**SpendSight** is a lightweight web-based tool that transforms messy Indian bank statement PDFs into clean, structured CSV/Excel files — with instant categorization, AI-powered insights, and even bill photo uploads.  
Whether you're an individual tracking monthly expenses or a small business consolidating finances, SpendSight makes financial clarity just one click away.

---

## 🚀 Features

- **📄 PDF to CSV/Excel** – Upload Indian bank statements and get a clean, ready-to-use file instantly.
- **📊 AI Categorization** – Auto-detect and categorize expenses (Food, Rent, Utilities, Subscriptions, etc.).
- **🧠 AI Insights** – Ask questions about your spending and get personalized financial summaries.
- **📷 Bill Snap Upload** – Take a photo of your bills and track those expenses seamlessly.
- **💼 Business Mode** – PowerBI-friendly exports and advanced analytics for business users.
- **🔒 Privacy First** – No bank login required; we only process files you choose to upload.

---

## 🛠 Tech Stack

**Frontend:**  
- React.js + TypeScript  
- Tailwind CSS

**Backend (in progress):**  
- Python + FastAPI  
- Supabase (PostgreSQL)  
- NLP Pipeline: Regex → BERT → DeepSeek R1 fallback

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- npm or yarn
- Supabase account (optional for backend)

### Frontend Setup

# Clone repo
git clone https://github.com/Zenoguy/SpendSight.git

# Go into folder
cd FrontEnd

# Install dependencies
npm install

# Start dev server
npm run dev

# Backend Setup

# Navigate to backend folder
cd backend

# Create virtual env & activate
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload

# 🔒 Privacy & Disclaimer
SpendSight does not request or store bank login credentials. All processing happens only on files you voluntarily upload. You may redact sensitive details before upload.
See Privacy Policy [https://github.com/Zenoguy/SpendSight/blob/main/SpendSight_PrivacyPolicy.md] for details.

# 📌 Roadmap
 Complete backend with FastAPI + Supabase

 Add AI Insights to business-tier dashboard

 Implement OCR for bill snap uploads

 Deploy full-stack app

# 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a pull request.

# 📬 Contact
Author: Shreyan Ghosh

LinkedIn: https://www.linkedin.com/in/shreyan-ghosh/

GitHub: https://github.com/Zenoguy



