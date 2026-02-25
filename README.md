# Aura Intelligence | Revenue Intelligence Engine

Aura is a high-performance **Revenue Intelligence Engine** evolved from a simple proposal builder. It optimizes deal outcomes using probabilistic win modeling, Bayesian margin optimization, and Reinforcement Learning simulations.

## 🧠 Strategic Architecture

### 1. Win Probability Model
- **Logic**: Gradient-boosted classifiers (simulated) that analyze CRM data (Sector, Deal Size, Rep Experience, Competitor Presence).
- **Goal**: Maximize $P(win | \theta)$ where $\theta$ is the set of deal features.

### 2. Margin Optimization
- **Logic**: Bayesian hierarchical modeling.
- **Goal**: Find the optimal discount $D$ that maximizes $(P(win | D) \times Margin)$. Aura identifies the "Sweet Spot" where pricing is competitive but not dilutive.

### 3. Negotiation Simulation Engine
- **Logic**: Markov Decision Process (MDP) with Reinforcement Learning.
- **Engine**: Simulates buyer personas (Rational, Aggressive, Conservative) to test concession strategies and predict counteroffers.

### 4. Proposal Generation Layer
- **Logic**: Retrieval-Augmented Generation (RAG).
- **Output**: Margin-aware, sector-specific narratives that prioritize value over price.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- NPM / Yarn / PNPM

### Installation
```bash
npm install --legacy-peer-deps
```

### Environment Setup
Create a `.env` file with your OpenAI API Key for the Proposal Composer:
```env
OPENAI_API_KEY=your_key_here
```

### Running Locally
```bash
npm run dev
```

## 🛠 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom Glassmorphism System
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Vercel AI SDK
