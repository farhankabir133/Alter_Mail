# AltMail - Technical Architecture Documentation

## 📊 Codebase Statistics

- **Total TypeScript/React Files**: 549
- **Main Application Files**: 28 pages + components
- **Component Categories**: UI, Layout, Shared
- **Custom Hooks**: 1 (Hash-based routing)
- **Type Definitions**: Central types.ts file

---

## 🏗️ Architecture Patterns

### **Component Architecture**
```
components/
├── ui/                          # Reusable UI components
│   ├── Button.tsx              # Primary action buttons
│   ├── Card.tsx                # Content containers
│   ├── InputField.tsx          # Form inputs
│   ├── Logo.tsx                # Brand logo component
│   ├── DataStreamBackground.tsx # Animated backgrounds
│   ├── EncryptedMeshBackground.tsx # Security-themed backgrounds
│   └── ParticleBackground.tsx  # Interactive particle effects
├── layout/                     # Layout structure components
│   ├── Navbar.tsx              # Main navigation
│   └── Footer.tsx              # Site footer
└── shared/                     # Shared utility components
```

### **Page-Based Routing**
- **Router**: Wouter (lightweight React router)
- **Navigation Pattern**: Hash-based routing for SPA compatibility
- **Animation**: Framer Motion page transitions
- **Route Protection**: Conditional navbar display

### **State Management Strategy**
1. **Server State**: TanStack React Query for data fetching/caching
2. **Local State**: React useState/useReducer
3. **Global State**: Context API (implied for theme/auth)
4. **Real-time State**: Socket.io for live updates

---

## 🔄 Data Flow Architecture

### **Email Generation Flow**
```typescript
User Action → API Mutation → Loading State → Success/Error → UI Update
     ↓
createNewEmail() → Mock API Response → Mailbox Object → State Update
```

### **Real-time Updates Flow**
```typescript
Socket.io Connection → Server Events → Client Listeners → State Updates → UI Re-render
```

### **State Management Pattern**
```typescript
// API Layer
const createNewEmail = async (): Promise<Mailbox> => {
    // Simulated API call with delay
    await new Promise(res => setTimeout(res, 1500));
    return Promise.resolve({
        id: 'mock_id_' + Math.random().toString(36).substr(2, 9),
        address: `${Math.random().toString(36).substr(2, 10)}@altmail.dev`,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    });
};

// React Query Integration
const { mutate, isLoading, error } = useMutation({
    mutationFn: createNewEmail,
    onSuccess: (data) => setCurrentEmail(data),
    onError: (error) => handleError(error)
});
```

---

## 🎨 Design System Implementation

### **Theme Configuration**
```javascript
// Tailwind CSS Configuration (inline)
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                brand: {
                    primary: '#0ea5e9',    // sky-500
                    secondary: '#4f46e5',  // indigo-600
                    '50': '#f0f9ff',       // Light variations
                    '900': '#0c4a6e',      // Dark variations
                },
            },
            animation: {
                'gradient-bg': 'gradient-bg 15s ease infinite',
            }
        }
    }
}
```

### **Component Design Patterns**
```typescript
// Consistent button component pattern
interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

// Animation variants for consistency
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
};
```

---

## 🔧 Build & Development Workflow

### **Vite Configuration Details**
```typescript
// vite.config.ts
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),  // Path aliasing
            }
        }
    };
});
```

### **TypeScript Configuration**
```json
{
    "compilerOptions": {
        "target": "ES2022",
        "experimentalDecorators": true,
        "useDefineForClassFields": false,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "jsx": "react-jsx",
        "allowImportingTsExtensions": true,
        "noEmit": true
    }
}
```

### **Development Tools**
- **Hot Reload**: Vite HMR for instant updates
- **Type Checking**: Real-time TypeScript validation
- **Import Maps**: External dependency management
- **Path Resolution**: Alias support for cleaner imports

---

## 🌐 Routing Implementation

### **Custom Hash-based Router**
```typescript
// useHashLocation.ts - Custom hook for hash routing
const currentLoc = () => window.location.hash.replace(/^#/, "") || "/";

const navigate = (to: Path) => {
    window.location.hash = to;
};

export const useHashLocation: BaseLocationHook = () => {
    const [loc, setLoc] = useState<Path>(currentLoc());
    
    useLayoutEffect(() => {
        const handler = () => setLoc(currentLoc());
        window.addEventListener("hashchange", handler);
        return () => window.removeEventListener("hashchange", handler);
    }, []);
    
    return [loc, navigate];
};
```

### **Route Configuration**
```typescript
// App.tsx route definitions
const routes = [
    { path: "/", component: LandingPage },
    { path: "/app", component: AppPage },
    { path: "/login", component: LoginPage },
    { path: "/signup", component: SignupPage },
    { path: "/dashboard", component: DashboardPage },
    // ... additional routes
];
```

---

## 🔒 Security & Performance

### **Security Measures**
- **Environment Variables**: Secure API key management
- **Client-side Routing**: Hash-based navigation
- **Input Validation**: TypeScript type safety
- **XSS Prevention**: React's built-in sanitization

### **Performance Optimizations**
- **Code Splitting**: Route-based automatic splitting
- **Bundle Size**: ~440KB optimized JavaScript
- **Tree Shaking**: Unused code elimination
- **CDN Delivery**: External dependencies via aistudiocdn.com
- **Modern Module Loading**: ES modules for better performance

### **Build Output Analysis**
```
dist/
├── index.html           # 2.40 kB (gzip: 0.97 kB)
└── assets/
    └── index-*.js       # 439.05 kB (gzip: 132.88 kB)
```

---

## 🔌 API Integration Strategy

### **Mock API Implementation**
```typescript
// Current implementation uses mock data
const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || 'http://localhost:8080';

// Mock functions simulate real API behavior
const createNewEmail = async (): Promise<Mailbox> => {
    await new Promise(res => setTimeout(res, 1500)); // Simulate network delay
    return {
        id: generateRandomId(),
        address: generateRandomEmail(),
        expiresAt: generateExpirationTime(),
    };
};
```

### **Real-time Communication**
```typescript
// Socket.io integration for live updates
import { io } from "socket.io-client";

// Connection management
const socket = io(API_BASE);
socket.on('newEmail', (email: EmailMessage) => {
    // Update inbox in real-time
});
```

---

## 📱 Responsive Design Strategy

### **Breakpoint Strategy**
- **Mobile First**: Default styles for mobile
- **Tablet**: `md:` prefix for medium screens
- **Desktop**: `lg:` and `xl:` for larger screens
- **Flexible Layouts**: Flexbox and Grid for adaptability

### **Mobile Optimizations**
```typescript
// Responsive navigation pattern
const [location] = useLocation();
const noNavRoutes = ['/login', '/signup', '/dashboard'];
const showNavbar = !noNavRoutes.some(route => location.startsWith(route));

// Responsive component patterns
<div className="flex flex-col md:flex-row items-center gap-4">
    <span className="font-mono text-lg md:text-2xl break-all">
        {email}
    </span>
</div>
```

---

## 🚀 Deployment Architecture

### **AI Studio Platform Integration**
- **Import Maps**: CDN-based dependency loading
- **Environment**: Browser-native ES modules
- **Build Target**: Modern browsers with ES2022 support
- **Static Hosting**: Pre-built assets served via CDN

### **CDN Strategy**
```html
<!-- External dependencies via aistudiocdn.com -->
<script type="importmap">
{
    "imports": {
        "react": "https://aistudiocdn.com/react@^19.1.1",
        "framer-motion": "https://aistudiocdn.com/framer-motion@^12.23.12",
        "@tanstack/react-query": "https://aistudiocdn.com/@tanstack/react-query@^5.85.6"
    }
}
</script>
```

---

## 🔄 State Management Deep Dive

### **Component State Patterns**
```typescript
// Local state management
const [currentEmail, setCurrentEmail] = useState<Mailbox | null>(null);
const [timeLeft, setTimeLeft] = useState(0);
const [copied, setCopied] = useState(false);

// Effect patterns for timers
useEffect(() => {
    if (!currentEmail) return;
    const timer = setInterval(() => {
        const now = Date.now();
        const expires = new Date(currentEmail.expiresAt).getTime();
        const remaining = Math.max(0, expires - now);
        setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(timer);
}, [currentEmail]);
```

### **Error Handling Strategy**
```typescript
// React Query error handling
const { mutate, isLoading, error } = useMutation({
    mutationFn: createNewEmail,
    onError: (error) => {
        console.error('Failed to create email:', error);
        // User feedback through UI
    }
});
```

---

## 📈 Monitoring & Analytics

### **Performance Monitoring**
- **Build-time**: Vite build analysis
- **Bundle Size**: Automatic size reporting
- **Load Time**: Modern module loading optimization

### **User Experience Tracking**
- **Navigation**: Hash-based route tracking
- **Interactions**: Button clicks and form submissions
- **Real-time**: Socket connection status

---

This technical architecture supports a modern, scalable, and maintainable React application with excellent developer experience and user performance.