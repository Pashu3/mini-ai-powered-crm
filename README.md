
---

# AI-Powered CRM System

An advanced customer relationship management system with built-in AI capabilities for sales teams to efficiently manage leads, automate follow-ups, and leverage AI-driven insights.

---

## 🚀 Features

* **Smart Lead Management**: Comprehensive lead profiles with qualification scoring and activity tracking
* **AI-Powered Suggestions**: Contextual recommendations for follow-ups and outreach
* **Multi-Channel Communication**: Track conversations across email, calls, meetings, and social platforms
* **Campaign Automation**: Create multi-step outreach sequences with performance tracking
* **Task Management**: Prioritized tasks with due dates and lead associations
* **Real-Time Notifications**: WebSocket-based alert system for time-sensitive updates
* **Analytics Dashboard**: Visual representation of key metrics and performance data
* **Global Search**: Unified search across all entities with keyboard navigation
* **Message Templates**: Reusable templates with personalization variables
* **Mobile-Responsive Design**: Full functionality across all device sizes
* **Theme Support**: Light and Dark themes available; dark theme recommended for optimal user experience
* **JWT-Based Authentication**: Simple and secure authentication using JSON Web Tokens (JWT)

📘 *For a more in-depth overview of the system and its features, refer to the full documentation here: [documentation.md](https://github.com/Pashu3/mini-ai-powered-crm/blob/main/documentation.md)*.

---


## 🌐 Live Demo

Check out the live demo of the application: [AI-Powered CRM](https://mini-ai-powered-crm.vercel.app)


## 🛠️ Tech Stack

### Frontend

* **Next.js 14** – App Router powered React framework
* **TypeScript** – Type-safe JavaScript
* **TailwindCSS** – Utility-first CSS
* **Framer Motion** – Smooth animations
* **Socket.io-client** – Real-time WebSocket support

### Backend

* **Next.js API Routes** – Serverless functions
* **NextAuth.js** – Flexible authentication
* **Prisma ORM** – Type-safe database access
* **MongoDB** – Cloud-native NoSQL database
* **Socket.io** – Real-time communication

### AI Components

* **OpenAI Integration** – AI-driven insights & NLP
* **Text Processing** – Lead understanding & analysis

## 📂 Project Structure

```
mini-ai-powered-crm/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── page.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   │   ├── authOptions.ts
│   │   ├── prisma.ts
│   │   └── socket-server.ts
│   └── services/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── .env
├── next.config.js
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* MongoDB (local or Atlas)
* OpenAI API key

### Installation

```bash
git clone https://github.com/Pashu3/mini-ai-powered-crm.git
cd mini-ai-powered-crm
npm install
```

### Environment Setup

Create a `.env` file:

```env
DATABASE_URL="your_mongodb_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret_key"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="your_openai_api_key"

MOCK_AI="true"
MOCK_REDIS="true"

EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="your_email@gmail.com"
EMAIL_PASSWORD="your_app_password"
EMAIL_FROM="your_email@gmail.com"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
SESSION_EXPIRY="30d"
HASH_SALT_ROUNDS=10
```

### Database Initialization

```bash
npx prisma generate
npx prisma db push
```

### Run the Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

Deployed on Vercel at: [https://mini-ai-powered-crm.vercel.app](https://mini-ai-powered-crm.vercel.app)

## 🔑 Key Implementation Details

### Authentication

Secure, multi-provider login via NextAuth.js with JWT sessions.

### Real-Time Notifications

Built using WebSockets to alert users on:

* AI suggestions
* Campaign status
* Task reminders
* Lead updates

### Global Search

Powerful, unified search that spans:

* Leads
* Conversations
* Tasks
* Templates
* Campaigns

With relevance-based ranking and direct-action links.

## 🚨 Known Limitations & Future Improvements

1. **Settings Preferences**: UI available, but actual preferences are not yet functional.
2. **AI Integration**: May fallback to mock data due to OpenAI usage limitations or cost constraints.
3. **Development Performance**: Slower performance in dev environments due to heavy processing and WebSocket usage.

## 🙏 Acknowledgements

* [Next.js](https://nextjs.org)
* [Prisma](https://prisma.io)
* [OpenAI](https://openai.com)
* All contributing open-source libraries

---
