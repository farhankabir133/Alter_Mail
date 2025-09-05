# AltMail - Disposable Email Service

## 🔗 Project Overview

**AltMail** is a modern, clean SaaS application for temporary and disposable email addresses. The application provides real-time inbox updates, features a 10-minute email timer, and offers upgrade options for extended use.

- **Live Demo**: [AI Studio App](https://ai.studio/apps/drive/10RfNIFDPb0plnFoXNm3J1Wo1_hRzJP-k)
- **Repository**: `farhankabir133/Alter_Mail`
- **Version**: 0.0.0
- **Type**: Progressive Web Application (PWA)

---

## 🛠️ Technology Stack

### **Frontend Framework & Core Libraries**

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | Latest React for building user interfaces |
| **TypeScript** | 5.8.2 | Type safety and enhanced development experience |
| **Vite** | 6.2.0 | Modern build tool and development server |

### **Routing & Navigation**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Wouter** | 3.7.1 | Lightweight React router (alternative to React Router) |
| **Hash Location Hook** | Custom | Client-side hash-based routing implementation |

### **State Management & Data Fetching**

| Technology | Version | Purpose |
|------------|---------|---------|
| **TanStack React Query** | 5.85.6 | Server state management, caching, and data fetching |

### **Animation & UI**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Framer Motion** | 12.23.12 | Smooth animations and page transitions |
| **Tailwind CSS** | Latest (CDN) | Utility-first CSS framework |
| **Inter Font** | Google Fonts | Modern, readable typography |

### **Real-time Communication**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Socket.io Client** | 4.8.1 | Real-time inbox updates and live email notifications |

### **Build Tools & Development**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **@types/node** | 22.14.0 | Node.js TypeScript definitions |
| **ES2022/ESNext** | - | Modern JavaScript features and syntax |

### **External APIs & Services**

| Service | Purpose |
|---------|---------|
| **Gemini AI API** | Enhanced features and content generation |
| **AI Studio CDN** | Package delivery and hosting infrastructure |

---

## 📁 Project Structure

```
Alter_Mail/
├── components/           # Reusable UI components
│   ├── layout/          # Layout components (Navbar, etc.)
│   ├── shared/          # Shared components
│   └── ui/              # UI-specific components
├── pages/               # Page components
│   ├── LandingPage.tsx      # Home/landing page
│   ├── AppPage.tsx          # Main disposable email interface
│   ├── LoginPage.tsx        # User authentication
│   ├── SignupPage.tsx       # User registration
│   ├── DashboardPage.tsx    # User dashboard
│   ├── ServicesPage.tsx     # Services information
│   ├── PricingPage.tsx      # Pricing plans
│   ├── AboutPage.tsx        # About information
│   ├── APIPage.tsx          # API documentation
│   ├── FutureIntegrationPage.tsx  # Future features showcase
│   ├── ChangelogPage.tsx    # Changelog/updates
│   ├── ForgotPasswordPage.tsx     # Password recovery
│   ├── ResetPasswordPage.tsx      # Password reset
│   └── NotFoundPage.tsx     # 404 error page
├── hooks/               # Custom React hooks
│   └── useHashLocation.ts   # Hash-based routing hook
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
├── metadata.json        # App metadata for AI Studio
├── README.md            # Basic setup instructions
└── .gitignore           # Git ignore rules
```

---

## 🚀 Key Features

### **Core Functionality**
- ✅ **Disposable Email Generation** - Create temporary email addresses
- ✅ **10-Minute Timer** - Automatic email expiration
- ✅ **Real-time Inbox Updates** - Live email notifications via WebSocket
- ✅ **HTML Email Support** - Display rich email content
- ✅ **Responsive Design** - Works on all device sizes

### **User Experience**
- ✅ **Modern SaaS Interface** - Clean, professional design
- ✅ **Dark Mode Support** - Built-in theme switching
- ✅ **Smooth Animations** - Framer Motion page transitions
- ✅ **Progressive Loading** - Optimized performance

### **Authentication & Accounts**
- ✅ **User Registration/Login** - Account management
- ✅ **Password Recovery** - Forgot/reset password flow
- ✅ **Dashboard** - User account management
- ✅ **Upgrade Options** - Extended usage plans

### **Additional Pages**
- ✅ **API Documentation** - Developer resources
- ✅ **Services & Pricing** - Business information
- ✅ **About Page** - Company/project information
- ✅ **Future Integrations** - Roadmap showcase
- ✅ **Changelog** - Update history

---

## 📋 TypeScript Interfaces

### **Email Message**
```typescript
interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  body: string;        // HTML content
  receivedAt: string;  // ISO timestamp
}
```

### **Mailbox**
```typescript
interface Mailbox {
  id: string;
  address: string;
  expiresAt: string;   // ISO timestamp
}
```

---

## ⚙️ Configuration

### **Vite Configuration**
- **Environment Variables**: Gemini API key configuration
- **Path Aliasing**: `@/*` for cleaner imports
- **Build Optimization**: Modern ES modules and tree-shaking

### **TypeScript Configuration**
- **Target**: ES2022
- **Module**: ESNext
- **JSX**: react-jsx
- **Strict Mode**: Enabled for type safety

### **Tailwind Configuration**
- **Dark Mode**: Class-based theme switching
- **Custom Colors**: Brand-specific color palette (Sky/Indigo)
- **Custom Animations**: Gradient background animations
- **Inter Font**: Default font family

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (Latest LTS version)
- npm or yarn package manager

### **Installation**
```bash
# Clone the repository
git clone https://github.com/farhankabir133/Alter_Mail.git
cd Alter_Mail

# Install dependencies
npm install

# Set up environment variables
# Create .env.local and add your Gemini API key
GEMINI_API_KEY=your_api_key_here
```

### **Development**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Available Scripts**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

---

## 🔧 Build & Deployment

### **Build Process**
- **Bundler**: Vite with Rollup
- **Output**: Static files in `dist/` directory
- **Optimization**: Code splitting, tree shaking, minification
- **Bundle Size**: ~440KB JavaScript, ~2.4KB HTML

### **Deployment Platform**
- **Hosting**: Google AI Studio
- **CDN**: aistudiocdn.com for package delivery
- **Environment**: Browser-based with modern ES module support

---

## 🌐 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **JavaScript**: ES2022 features required
- **Modules**: Native ES module support
- **APIs**: WebSocket, LocalStorage, Modern CSS

---

## 📈 Performance Features

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Modern Bundling**: ES modules for better performance
- **CDN Delivery**: External dependencies from CDN
- **Lazy Loading**: Component-level lazy loading

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Sky Blue (#0ea5e9)
- **Secondary**: Indigo (#4f46e5)
- **Background**: Slate/Gray tones
- **Theme**: Light and dark mode support

### **Typography**
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800, 900

### **Animations**
- **Page Transitions**: Framer Motion
- **Loading States**: Custom animations
- **Micro-interactions**: Hover and focus states

---

## 🔮 Future Roadmap

The application includes a dedicated "Future Integrations" page, indicating plans for:
- Additional email providers
- API integrations
- Enhanced features
- Third-party service connections

---

## 📄 License & Contributing

This project is part of the AI Studio ecosystem and follows modern web development best practices. The codebase is well-structured for maintainability and scalability.

---

**Last Updated**: December 2024  
**Maintainer**: farhankabir133  
**Platform**: Google AI Studio