<!-- Project Logo / Banner -->
<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3c1a3V0aDNkOHJxcm5tNWh2NmoxZnE3ZWRwOWgwM3hmcThzMnpsbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEjI6SIIHBdRxXI40/giphy.gif" width="120" alt="Project Logo">
</p>

<h1 align="center">💊 Misdiagnosis Elimination via Medical RAG 🧠</h1>

<p align="center">
  <i>A GenAI-powered medical assistant that reduces misdiagnosis by combining patient data with PubMed + medical guidelines through RAG (Retrieval Augmented Generation).</i>
</p>

---

## ✨ Features
✅ Secure login / authentication  
✅ Patient symptom input form  
✅ Medical history file upload (PDF/TXT)  
✅ RAG search on PubMed + clinical guidelines  
✅ Ranked diagnoses with **confidence scores**  
✅ Recommended **short-term & long-term treatments**  
✅ Interactive charts & visualizations  
✅ Exportable PDF report  
✅ Admin dashboard for case reviews  
✅ Dark mode + mobile-first responsive UI  
✅ Privacy/consent notice & disclaimers  

---

## 🛠️ Tech Stack
- **Frontend**: [Next.js 14](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)  
- **Backend**: Node.js, Next.js API Routes  
- **ML / GenAI**: OpenAI API, FAISS for vector search, PubMed integration  
- **Database**: PostgreSQL / Supabase (free tier)  
- **Deployment**: [Vercel](https://vercel.com/)  
- **Version Control**: Git & GitHub  

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Run locally
bash
Copy code
npm run dev
Visit 👉 http://localhost:3000

4️⃣ Build for production
bash
Copy code
npm run build
npm start
📊 Example Output
json
Copy code
{
  "diagnosis": "Type 2 Diabetes",
  "confidence": "92%",
  "treatment": {
    "short_term": ["Control blood sugar with diet", "Start metformin if advised"],
    "long_term": ["Weight management", "Exercise regularly", "Annual eye exams"]
  },
  "sources": [
    "PubMed: https://pubmed.ncbi.nlm.nih.gov/xxxxxxx",
    "American Diabetes Association Guidelines"
  ]
}
🎥 Demo / Screenshots
<p align="center"> <img src="https://media.giphy.com/media/xT9Igp0kGqF1zC3S3m/giphy.gif" width="700" alt="Demo GIF"> </p>
⚡ Deployment
Default: Deploy easily on Vercel

Or run in Docker:

bash
Copy code
docker build -t medrag .
docker run -p 3000:3000 medrag
📜 License
This project is licensed under the MIT License — see the LICENSE file for details.

⚠️ Disclaimer
⚠️ Not a substitute for professional medical advice.
This project is for educational and research purposes only.
Always consult a certified doctor for medical decisions.

<p align="center">Made with ❤️ using Next.js + RAG</p> ```
