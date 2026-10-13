<div align="center">

# Next AI Chatbot

**A modern AI playground that demonstrates chat, streaming, structured output, image generation, and multimodal input.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-000000?style=for-the-badge&logo=vercel&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

</div>

---

## Overview

Next AI Chatbot is a hands-on showcase of the Vercel AI SDK v5 with OpenAI. Each route demonstrates one core capability of modern LLM apps, from a basic chat to streaming text, structured data extraction, image generation, and multimodal chat.

## Features

| Demo | What it shows |
| --- | --- |
| **Chat** | Conversational chat with message history |
| **Completion** | Single-prompt text completion |
| **Stream** | Token-by-token streaming responses |
| **Structured data** | Generating typed objects validated with Zod |
| **Structured array** | Generating lists of typed items |
| **Structured enum** | Classifying input into a fixed set of labels |
| **Image generation** | Generating images from prompts |
| **Multimodal chat** | Chatting with text and file or image input |

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router, Turbopack), React 19 |
| Language | TypeScript |
| AI | Vercel AI SDK v5, OpenAI |
| Validation | Zod |
| Styling | Tailwind CSS 4, shadcn/ui |

## Getting Started

### Prerequisites

- Node.js and npm
- An OpenAI API key

### Installation

```bash
git clone https://github.com/RithyBondeth/Next-AI-Chatbot.git
cd Next-AI-Chatbot
npm install
echo "OPENAI_API_KEY=your-key" > .env.local
npm run dev
```

Open [http://localhost:8001](http://localhost:8001).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 8001 |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```text
Next-AI-Chatbot/
├── app/
│   ├── api/    # chat, completion, stream, structure-*, generate-image, multi-modal-chat
│   └── ui/     # A page for each demo
├── components/ # AI response message and shadcn/ui primitives
└── lib/
```

## Author

**Rithy Bondeth** — Full Stack Developer & AI Engineer

[![Portfolio](https://img.shields.io/badge/Portfolio-0A0A0A?style=for-the-badge&logo=vercel&logoColor=white)](https://bondeth.dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RithyBondeth)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rithy-bondeth-484073282/)

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
