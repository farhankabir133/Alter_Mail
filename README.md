<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AltMail - Disposable Email Service 📧

**A modern, clean SaaS application for temporary and disposable email addresses with real-time inbox updates, 10-minute timers, and upgrade options for extended use.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-AI%20Studio-blue)](https://ai.studio/apps/drive/10RfNIFDPb0plnFoXNm3J1Wo1_hRzJP-k)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)](https://vitejs.dev/)

## 🚀 Quick Start

**Prerequisites:** Node.js (Latest LTS)

```bash
# Clone the repository
git clone https://github.com/farhankabir133/Alter_Mail.git
cd Alter_Mail

# Install dependencies
npm install

# Set up environment (optional)
# Create .env.local for Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# Start development server
npm run dev
```

**🌐 View Live Demo:** [AI Studio App](https://ai.studio/apps/drive/10RfNIFDPb0plnFoXNm3J1Wo1_hRzJP-k)

## 📋 Project Documentation

- **📖 [PROJECT_DETAILS.md](PROJECT_DETAILS.md)** - Comprehensive project overview, features, and technology stack
- **🏗️ [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)** - Deep-dive technical documentation and architecture patterns

## ⭐ Key Features

- ✅ **Instant Email Generation** - Create disposable emails in seconds
- ✅ **Real-time Inbox** - Live email updates via WebSocket
- ✅ **10-Minute Timer** - Automatic email expiration with extend options
- ✅ **Modern UI/UX** - Clean SaaS interface with dark mode
- ✅ **Responsive Design** - Works perfectly on all devices
- ✅ **User Accounts** - Registration, login, and dashboard
- ✅ **API Ready** - Built for future integrations

## 🛠️ Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19.1.1, TypeScript 5.8.2, Vite 6.2.0 |
| **Styling** | Tailwind CSS, Framer Motion, Inter Font |
| **Routing** | Wouter (lightweight React router) |
| **State** | TanStack React Query, Socket.io Client |
| **Build** | Modern ES Modules, Path Aliasing, Tree Shaking |
| **Deployment** | Google AI Studio, CDN-based dependencies |

## 📂 Project Structure

```
Alter_Mail/
├── components/          # Reusable UI components
│   ├── ui/             # Buttons, Cards, Backgrounds
│   ├── layout/         # Navbar, Footer
│   └── shared/         # Shared utilities
├── pages/              # Route components (14 pages)
├── hooks/              # Custom React hooks
├── types.ts            # TypeScript definitions
├── App.tsx             # Main application
└── vite.config.ts      # Build configuration
```

## 🎯 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔧 Development

The application is built with modern web standards:

- **ES2022** target for latest JavaScript features
- **Module bundling** with automatic code splitting
- **Hot module replacement** for instant development feedback
- **TypeScript** for enhanced developer experience
- **Path aliasing** with `@/*` imports

## 🌐 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **JavaScript**: ES2022 features required
- **Modules**: Native ES module support

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | LandingPage | Homepage with feature overview |
| `/app` | AppPage | Main disposable email interface |
| `/login` | LoginPage | User authentication |
| `/signup` | SignupPage | Account registration |
| `/dashboard` | DashboardPage | User account management |
| `/services` | ServicesPage | Service information |
| `/pricing` | PricingPage | Pricing plans |
| `/about` | AboutPage | About information |
| `/api` | APIPage | API documentation |

## 🔮 Future Features

The application includes a roadmap for:
- Enhanced email providers
- API integrations  
- Third-party service connections
- Extended functionality

## 📊 Performance

- **Bundle Size**: ~440KB JavaScript (132KB gzipped)
- **Build Time**: ~2 seconds
- **Hot Reload**: Instant updates during development
- **Modern Loading**: ES modules for optimal performance

---

**Maintainer:** [farhankabir133](https://github.com/farhankabir133)  
**Platform:** Google AI Studio  
**License:** MIT
