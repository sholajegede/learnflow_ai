# LearnFlow AI

LearnFlow AI is an intelligent learning platform that provides personalized educational experiences through AI companions. The platform leverages Vapi.ai for voice interactions and Convex for real-time data, offering interactive learning journeys across various subjects with voice-enabled AI companions.

## Features

- 🎙️ **Voice-Enabled AI Companions**: Interactive voice AI tutors using Vapi.ai that adapt to your learning style
- 🗣️ **Natural Language Interaction**: Have natural conversations with your AI learning companions
- 📚 **Personalized Learning Paths**: Customized educational journeys based on your goals
- 📊 **Progress Tracking**: Monitor your learning with detailed analytics
- 🎯 **Subject-Specific Content**: Organized learning materials across various subjects
- 🔍 **Smart Search**: Easily find learning companions and resources
- 👥 **User Profiles**: Personalized dashboards and learning history
- 🔄 **Real-time Updates**: Powered by Convex for seamless data synchronization
- 💳 **Subscription Management**: Integrated billing system with multiple subscription tiers
- 🔒 **Secure Payments**: Safe and secure payment processing through Kinde Billing

## Tech Stack

- **Frontend**: Next.js 13+ with TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Authentication & Billing**: Kinde (Authentication & Billing)
- **Database & Backend**: Convex
- **Voice AI**: Vapi.ai
- **State Management**: React Context API
- **Animation**: Framer Motion
- **Icons**: Lucide Icons & Tabler Icons

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn
- Convex account
- Kinde account for authentication

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
   Create a `.env.local` file in the root directory and add the following:
   ```
   # Convex
   CONVEX_DEPLOYMENT=your_convex_deployment
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   NEXT_PUBLIC_CONVEX_HTTP_URL=your_convex_http_url

   # Kinde Authentication
   KINDE_CLIENT_ID=your_kinde_client_id
   KINDE_CLIENT_SECRET=your_kinde_client_secret
   KINDE_ISSUER_URL=your_kinde_issuer_url
   NEXT_PUBLIC_KINDE_ISSUER_URL=your_kinde_issuer_url
   KINDE_SITE_URL=http://localhost:3000
   KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
   KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
   NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_CODE=your_kinde_email_connection
   NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE=your_kinde_google_connection

   # Vapi Voice AI
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
   VAPI_SECRET_KEY=your_vapi_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
learnflow-ai/
├── app/                    # App router
│   ├── (root)/             # Protected routes
│   ├── (website)/          # Public website pages
│   ├── api/                # API routes
│   └── auth/               # Authentication pages
├── components/             # Reusable UI components
├── constants/              # Application constants
├── contexts/               # React contexts
├── convex/                 # Convex backend functions
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── providers/              # Context providers
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Next.js and Convex
- Voice AI powered by Vapi
- Styled with Tailwind CSS and Radix UI
- Authentication powered by Kinde
- Icons by Lucide & Tabler