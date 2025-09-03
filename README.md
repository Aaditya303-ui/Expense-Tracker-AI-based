# 💰 AI-Based Expense Tracker

A full-stack expense management system that tracks income & expenses, uses AI/ML for automatic categorization, provides financial insights via chatbot, and includes an admin panel for user management.

---

## 🏗️ Project Architecture

- **Frontend (React + Tailwind CSS)**  
  - User dashboard (income, expenses, balance, category-wise charts)  
  - Authentication pages (login/register)  
  - Integrated finance chatbot (Gemini API)  
  - Admin panel for CRUD operations on users

- **Backend (Node.js + Express + MongoDB)**  
  - JWT-based authentication  
  - REST APIs for income, expenses, and user management  
  - Secured routes for logged-in users  
  - Data persistence in MongoDB

- **AI Service (Python + Flask)**  
  - Machine learning model to predict expense categories  
  - Connected to frontend via REST API (`/predict-category`)

- **Chatbot (Gemini API)**  
  - Fetches user’s financial records  
  - Provides insights, savings suggestions, and summaries

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone <repo-url>
cd <project-folder>

2. Setup Backend
cd backend
npm install

Create a .env file in the backend
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-secret>
PORT=5000

Run the backend server:
npm start

3. Setup Frontend
cd ../frontend
npm install
npm start

4. Setup AI Service (ML Model)
cd ../ml
pip install -r requirements.txt
python app.py
