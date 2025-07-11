# LearnFlow AI

LearnFlow AI is an intelligent, voice-enabled learning platform that provides personalized educational experiences through AI companions. The platform combines cutting-edge technologies to deliver interactive, real-time learning experiences across various subjects.

## ✨ Features

### Core Learning Experience
- 🎙️ **AI-Powered Voice Companions**: Interactive tutors using Vapi.ai for natural voice interactions
- 📚 **Personalized Learning Paths**: Customized educational journeys based on user goals and progress
- 🔄 **Real-time Collaboration**: Interactive learning sessions with live updates and feedback
- 📊 **Progress Analytics**: Detailed tracking and visualization of learning metrics

### User Experience
- 👤 **Personalized Dashboards**: Customizable user profiles with learning history and achievements
- 🔍 **Advanced Search**: Intelligent search across learning materials and companions
- 📱 **Responsive Design**: Seamless experience across desktop and mobile devices
- 🎨 **Theme Support**: Light and dark mode with system preference detection

### Engagement & Management
- 💬 **Interactive Sessions**: Real-time chat and voice interactions with AI companions
- 📅 **Session History**: Track and revisit past learning sessions
- 🔖 **Bookmarking**: Save important content for quick access
- 🏆 **Achievements & Rewards**: Gamification elements to enhance motivation

### Administration
- 👥 **User Management**: Comprehensive user profiles and access control
- 💳 **Subscription Tiers**: Multiple membership levels with different features
- 🔒 **Secure Authentication**: Powered by Kinde with social login options
- 📈 **Usage Analytics**: Monitor platform engagement and user progress

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript 5.0+
- **UI Components**: Radix UI Primitives
- **Styling**: 
  - Tailwind CSS 4.0+
  - Class Variance Authority (CVA)
  - Tailwind Merge
- **State Management**:
  - React Context API
  - React Hook Form for forms
  - Zod for schema validation
- **Animation**: Framer Motion 12.0+
- **Icons**:
  - Lucide Icons
  - Tabler Icons
  - Radix Icons

### Backend & Database
- **Backend**: Convex
- **Database**: Convex
- **Real-time**: WebSockets for live updates
- **API**: Type-safe API routes with Next.js

### AI & Integrations
- **Voice AI**: Vapi.ai integration
- **Authentication**: Kinde (with social logins)
- **Payments**: Kinde Billing
- **Analytics**: Custom event tracking

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Build Tool**: Turbopack (in development)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm 9.0+ or yarn 1.22+
- Convex account and project
- Kinde account for authentication and billing
- Vapi.ai account for voice AI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/learnflow-ai.git
   cd learnflow-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following:
   ```env
   # ================
   # Core Configuration
   # ================
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # ================
   # Convex
   # ================
   CONVEX_DEPLOYMENT=your_convex_deployment
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   NEXT_PUBLIC_CONVEX_HTTP_URL=your_convex_http_url

   # ================
   # Authentication (Kinde)
   # ================
   KINDE_CLIENT_ID=your_kinde_client_id
   KINDE_CLIENT_SECRET=your_kinde_client_secret
   KINDE_ISSUER_URL=your_kinde_issuer_url
   NEXT_PUBLIC_KINDE_ISSUER_URL=your_kinde_issuer_url
   KINDE_SITE_URL=http://localhost:3000
   KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
   KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
   NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_CODE=your_kinde_email_connection
   NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE=your_kinde_google_connection

   # ================
   # Voice AI (Vapi)
   # ================
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
   VAPI_SECRET_KEY=your_vapi_secret_key
   ```

4. Initialize Convex:
   ```bash
   npx convex dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
learnflow-ai/
├── app/                    # App router
│   ├── (root)/             # Protected routes (authenticated users)
│   │   ├── companions/     # AI companion management
│   │   ├── dashboard/      # User dashboard
│   │   ├── history/        # Learning history
│   │   └── sessions/       # Learning sessions
│   │
│   ├── (website)/          # Marketing website
│   │   ├── privacy/        # Privacy policy
│   │   └── terms/          # Terms of service
│   │
│   ├── api/                # API routes
│   └── auth/               # Authentication pages
│
├── components/             # Reusable UI components
│   ├── ui/                 # Shadcn/ui components
│   ├── companion/          # Companion-related components
│   └── layout/             # Layout components
│
├── convex/                 # Backend with Convex
│   ├── _generated/         # Auto-generated types
│   ├── companions.ts       # Companion database logic
│   ├── users.ts            # User management
│   ├── sessions.ts         # Session handling
│   └── schema.ts           # Database schema
│
├── lib/                    # Utility functions
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── styles/                 # Global styles
```

## 🛠️ Development Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx convex dev` - Start Convex development environment

## 🔧 Configuration

### Environment Variables

All environment variables should be set in `.env.local` (see Installation section). Never commit sensitive information to version control.

### Convex Setup

1. Sign up at [Convex](https://www.convex.dev/)
2. Create a new project
3. Run `npx convex dev` to set up your local development environment
4. Deploy your Convex backend with `npx convex deploy`

### Kinde Setup

1. Sign up at [Kinde](https://kinde.com/)
2. Create a new application
3. Configure your authentication settings
4. Configure your billing settings
5. Set up social logins (Google, etc.)
6. Add your Kinde credentials to `.env.local`

### Vapi.ai Integration

1. Sign up at [Vapi](https://www.vapi.ai/)
2. Create a new project
3. Get your API keys
4. Add Vapi credentials to `.env.local`

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure code is properly formatted with Prettier

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - The React Framework for the Web
- **Convex** - The fullstack TypeScript development platform
- **Vapi.ai** - Voice AI for natural conversations
- **Kinde** - Authentication and billing
- **Radix UI** - Unstyled, accessible components
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide & Tabler Icons** - Beautiful, consistent icons & Tabler