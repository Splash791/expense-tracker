# 💸 A Modern Expense Tracker  

<img width="1916" height="993" alt="Screenshot 2025-08-30 at 11 34 51 AM" src="https://github.com/user-attachments/assets/72849d1f-de97-48e8-8f2e-1e158c7b0b5b" />


## 📖 Overview  

**Expense Eye** is a modern personal finance web application that makes expense tracking simple and insightful.  
It combines manual entry with in-browser OCR (powered by **Tesseract.js**) to extract data from receipts, and presents expenses through a clean, responsive dashboard with dynamic filters and visualizations.  

## ✨ Features  

- 📊 **Responsive Dashboard** – Clean, two-column layout with charts and tables.  
- 📝 **Manual Expense Entry** – Easy-to-use, validated modal form.  
- 🔍 **In-Browser OCR** – Scan receipts directly in the browser with **Tesseract.js**.  
- 📅 **Dynamic Filtering** – View expenses by month and year with a date-picker filter.  
- 🎨 **Data Visualization** – Interactive pie charts for category-based expense breakdowns.  
- ☁️ **Persistent Storage** – Secure, serverless data storage with **MongoDB Atlas**.  
- 🗑️ **Expense Management** – Delete or manage expenses directly from the dashboard.  

## 🛠️ Tech Stack  

- **Frontend**: Next.js (App Router), TypeScript, React Hooks  
- **Styling**: Tailwind CSS, ShadCN UI, Lucide React  
- **Forms & Validation**: React Hook Form, Zod  
- **Database**: MongoDB Atlas  
- **Backend**: Next.js API Routes, Mongoose  
- **OCR**: Tesseract.js  
- **Charts**: Recharts  

## 🚀 Getting Started  

### Prerequisites  
- [Node.js](https://nodejs.org/) and npm installed  

### Installation  

```bash
# Clone the repository
git clone [YOUR_REPO_URL]
cd expense-tracker

# Install dependencies
npm install
