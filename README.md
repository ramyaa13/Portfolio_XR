# 🌐 Rajalakshmi M — Portfolio Website

> **XR & AI Engineer** | Immersive Experiences · Intelligent Systems · Spatial Computing

---

## 📌 Overview

This is the personal portfolio website of **Rajalakshmi M**, an XR & AI Engineer specializing in building immersive Extended Reality (XR) experiences powered by Artificial Intelligence. The portfolio showcases projects, skills, and professional background in AR/VR/MR development and applied AI engineering.

The site is built with **React Native for Web**, enhanced with a **Retrieval-Augmented Generation (RAG)** pipeline and integrated with the **OpenAI API** to deliver an AI-assisted, interactive portfolio experience.

---

## ✨ Features

- 🤖 **AI Chat Assistant** — Visitors can ask questions about Rajalakshmi's experience, projects, and skills via an OpenAI-powered chatbot
- 🧠 **RAG Pipeline** — Context-aware responses grounded in portfolio content using Retrieval-Augmented Generation
- 🥽 **XR Project Showcase** — Highlighted AR/VR/MR projects with demos, descriptions, and tech stacks
- 💼 **Dynamic Resume Section** — Skills, experience, and education presented interactively
- 📱 **Cross-Platform UI** — Built with React Native (Web), ensuring mobile-first, responsive design
---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React Native (Web) | Cross-platform UI framework |
| Expo | Build tooling and web support |
| React Navigation | Page routing and navigation |
| Styled Components / NativeWind | Styling and theming |

### AI & Backend
| Technology | Purpose |
|---|---|
| OpenAI API (`gpt-4o`) | Conversational AI assistant |
| RAG Pipeline | Retrieval-Augmented Generation for context grounding |
| Supabase + `pgvector` | Primary vector store (PostgreSQL-based, production) |
| Local JSON Store (`store.json`) | Zero-config fallback vector store for local dev |
| OpenAI Embeddings (`text-embedding-3-small`) | 1536-dimensional semantic vector generation |
| Cosine Similarity (`src/lib/vectorStore.ts`) | Custom similarity search for local JSON store |
| Node.js / Express | Backend API server |

### Deployment
| Technology | Purpose |
|---|---|
| Vercel / Netlify | Frontend hosting |
| Railway / Render | Backend API hosting |
| GitHub Actions | CI/CD pipeline |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- OpenAI API Key
- Supabase project (optional — falls back to local JSON store if not configured)

### Installation

```bash
# Clone the repository
git clone https://github.com/rajalakshmi-m/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Supabase (Production — pgvector)
# Leave these unset to automatically fall back to the local JSON store
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# App Config
NEXT_PUBLIC_API_URL=http://localhost:3001
PORT=3001
```

> **💡 Zero-Config Mode:** If `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are not set, the app automatically falls back to the local JSON-based vector store at `public/data/embeddings/store.json` — no database setup required for local development.

### Running Locally

```bash
# Start the frontend (React Native Web / Expo)
npx expo start --web

# Start the backend API server (in a separate terminal)
cd server
npm run dev
```

Open [http://localhost:19006](http://localhost:19006) to view the portfolio in your browser.

---

## 🧠 RAG Architecture

The AI assistant is powered by a **Retrieval-Augmented Generation** pipeline with a **hybrid vector store** that supports both local development and production environments:

```
User Query
    │
    ▼
[Query Embedding]  ←── OpenAI text-embedding-3-small (1536 dimensions)
    │
    ▼
[Vector Store Router]
    ├── SUPABASE_URL set? ──► Supabase pgvector
    │                         └── match_documents() stored procedure
    │                              (PostgreSQL + pgvector extension)
    │
    └── No config? ──────────► Local JSON Store
                                └── public/data/embeddings/store.json
                                     (Cosine Similarity via src/lib/vectorStore.ts)
    │
    ▼
[Top-K Context Retrieval]  ←── Relevant portfolio chunks (projects, skills, bio)
    │
    ▼
[Prompt Construction]  ←── System prompt + retrieved context + user query
    │
    ▼
[OpenAI GPT-4o]
    │
    ▼
AI Response to User
```

### Vector Store Details

#### 🏭 Production — Supabase + pgvector
- Uses PostgreSQL with the `pgvector` extension
- A stored procedure `match_documents` handles vector similarity searches server-side
- Configured via `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` environment variables
- Best for scalability, persistence, and multi-user production deployments

#### 🛠️ Local / Fallback — JSON Vector Store
- Zero-config flat-file store at `public/data/embeddings/store.json`
- Custom **Cosine Similarity** function implemented in `src/lib/vectorStore.ts` performs manual nearest-neighbor matching
- Embeddings generated using OpenAI's `text-embedding-3-small` model (1536-dimensional vectors)
- Ideal for local development and testing without any database setup

**Knowledge Base includes:**
- Project descriptions and technical details
- Work experience and achievements
- Skills and technology expertise
- Research papers and publications (if any)
- Certifications and education

---

## 🤖 AI Chat API

**Endpoint:** `POST /api/chat`

```json
// Request
{
  "message": "What XR projects has Rajalakshmi worked on?"
}

// Response
{
  "reply": "Rajalakshmi has worked on several XR projects including...",
  "sources": ["projects.json#ar-navigation", "experience.json#xr-engineer"]
}
```

## 📦 Deployment

### Frontend (Expo Web → Vercel)

```bash
npx expo export --platform web
# Deploy the /dist folder to Vercel or Netlify
```

## 🔐 Security

- API keys are **never exposed** on the client-side
- All OpenAI and vector DB calls are proxied through the backend
- Rate limiting is applied on the `/api/chat` endpoint
- Input sanitization is performed before passing to the RAG pipeline

---

## 🧪 Scripts

```bash
npm start          # Start Expo dev server
npm run web        # Start Expo on web
npm run build      # Build for production (web)
npm run lint       # Run ESLint
npm run test       # Run Jest tests
npm run embed      # Re-generate portfolio embeddings
```

---

## 📄 License

This project is for personal portfolio use. All content, designs, and project descriptions are the intellectual property of **Rajalakshmi M**.

---

## 📬 Contact

**Rajalakshmi M** — XR & AI Engineer

- 🌐 Portfolio: [rajalakshmi.dev]([https://rajalakshmi.dev](https://portfolio-xr-seven.vercel.app/))
- 💼 LinkedIn: [linkedin.com/in/rajalakshmi-m](linkedin.com/in/rajalakshmi-mahadevan-0b5898159/)
- 📧 Email: ramyaa1304@gmail.com
---

<p align="center">
  Built with ❤️ by Rajalakshmi M · Powered by React Native, OpenAI & RAG
</p>
