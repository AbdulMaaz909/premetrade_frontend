# PrimeTrade Frontend - Task Management Application

A modern, full-stack task management application built with **Next.js 16**, **React 19**, and **Tailwind CSS**. This frontend provides a complete user authentication system, task CRUD operations, and user profile management with a responsive UI.

---

## 🎯 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [Environment Variables](#environment-variables)
7. [Architecture](#architecture)
8. [API Integration](#api-integration)
9. [Key Components](#key-components)
10. [Forms & Validation](#forms--validation)
11. [State Management](#state-management)
12. [Authentication & Security](#authentication--security)
13. [Middleware & Route Protection](#middleware--route-protection)
14. [Error Handling](#error-handling)
15. [Running the Application](#running-the-application)
16. [Deployment](#deployment)
17. [Contributing](#contributing)

---

## 📱 Project Overview

**PrimeTrade Frontend** is a comprehensive task management application that allows users to:

- **Register** and create user accounts with profile photo upload
- **Login** securely with email and password
- **Create, Read, Update, and Delete (CRUD)** tasks
- **Search & Filter** tasks by title or description
- **Manage Profile** with name and avatar updates
- **Access Protected Routes** with token-based authentication
- **Real-time Notifications** with toast messages for all operations

The application is built with modern frontend practices including form validation, error handling, and a sleek, responsive UI.

---

## ✨ Features

### Authentication
- ✅ User Registration with email and password validation
- ✅ Profile photo upload during registration
- ✅ Secure Login with JWT token management
- ✅ Automatic token expiry handling and logout
- ✅ Protected routes with middleware

### Task Management
- ✅ Create new tasks with title and description
- ✅ View all tasks in a clean, organized list
- ✅ Edit tasks inline with validation
- ✅ Delete tasks with confirmation
- ✅ Search and filter tasks in real-time
- ✅ Task count visibility

### Profile Management
- ✅ View user profile with avatar and details
- ✅ Edit profile name (email is read-only)
- ✅ Upload and update profile photo
- ✅ Sliding profile sidebar UI
- ✅ Logout functionality

### User Experience
- ✅ Toast notifications for all operations
- ✅ Form validation with error messages below fields
- ✅ Icon-based action buttons (edit, save, cancel, delete)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states and disabled buttons during operations

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.0.6 |
| **React** | React 19.2.0, React DOM 19.2.0 |
| **Styling** | Tailwind CSS 3.4.18 |
| **Forms** | React Hook Form 7.68.0, Zod 4.1.13 |
| **HTTP Client** | Axios |
| **Icons** | React Icons 5.5.0 (Feather) |
| **Notifications** | React Toastify 11.0.5 |
| **CSS** | PostCSS 8.5.6, Autoprefixer 10.4.22 |
| **Linting** | ESLint 9 |
| **Node.js** | 18+ (recommended) |
| **Package Manager** | npm |

---

## 📂 Project Structure

```
my-app/
├── public/                          # Static assets
├── src/
│   ├── app/
│   │   ├── layout.js                # Root layout with ToastProvider
│   │   ├── globals.css              # Global Tailwind styles
│   │   ├── page.js                  # Home/Login page
│   │   ├── dashboard/
│   │   │   └── page.jsx             # Dashboard page
│   │   └── register/
│   │       └── page.jsx             # Registration page
│   ├── components/
│   │   ├── Login.jsx                # Login form component
│   │   ├── Register/
│   │   │   └── Register.jsx         # Registration form component
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx        # Main dashboard with tasks & profile
│   │   └── Toast/
│   │       └── ToastProvider.jsx    # Global toast notification provider
│   ├── service/
│   │   ├── axios.js                 # Axios instance with interceptors
│   │   ├── routes.js                # API route definitions
│   │   └── index.js                 # Service functions (API calls)
│   └── utilities/
│       └── utils.js                 # Helper functions (isSuccess, getUserDetails)
├── middleware.js                    # Next.js middleware for route protection
├── package.json                     # Dependencies and scripts
├── jsconfig.json                    # Path aliases (@/*)
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── eslint.config.mjs                # ESLint configuration
├── next.config.mjs                  # Next.js configuration
└── README.md                        # This file

```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** 9.0 or higher

### Step 1: Clone the Repository

```bash
git clone https://github.com/AbdulMaaz909/premetrade_frontend.git
cd my-app
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages:
- React & Next.js core libraries
- Form validation (react-hook-form, zod)
- HTTP client (axios)
- UI components (react-toastify, react-icons)
- Styling (tailwindcss, postcss)

### Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

### Step 4: Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root with the following variable:

```env
# Backend API Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

**Note:** `NEXT_PUBLIC_` prefix makes this variable available on the client-side. Never expose sensitive keys in `NEXT_PUBLIC_` variables.

---

## 🏗 Architecture

### Frontend Architecture

```
┌─────────────────────────────────────────┐
│      Next.js App Router (App Dir)       │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐   │
│  │  Pages (Login, Register, Dashboard) │
│  └──────────────────────────────────┘   │
│           ↓                              │
│  ┌──────────────────────────────────┐   │
│  │  Components (Forms, UI Elements) │   │
│  └──────────────────────────────────┘   │
│           ↓                              │
│  ┌──────────────────────────────────┐   │
│  │  Services Layer (API Calls)      │   │
│  │  - axios instance                │   │
│  │  - interceptors (auth, errors)   │   │
│  │  - API routes                    │   │
│  └──────────────────────────────────┘   │
│           ↓                              │
│  ┌──────────────────────────────────┐   │
│  │  Backend API (Node/Express)      │   │
│  │  (http://localhost:5000)         │   │
│  └──────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘

Middleware: Route Protection (Token Validation)
Client Storage: localStorage (token, profile)
State Management: React Hooks (useState, useEffect)
Form Validation: React Hook Form + Zod
Notifications: React Toastify
```

### Data Flow

1. **User Input** → Form Component (React Hook Form)
2. **Validation** → Zod Schema
3. **API Call** → Service Layer (axios instance)
4. **Request Interceptor** → Add Authorization header
5. **Backend Response** → Response Interceptor
6. **Error Handling** → 401 Auto-logout, Toast Notifications
7. **State Update** → Component Re-render
8. **User Feedback** → Toast + UI Update

---

## 📡 API Integration

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | User login with email & password |
| `POST` | `/api/auth/register` | Register new user with profile photo |

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/task` | Fetch all tasks |
| `POST` | `/api/task` | Create a new task |
| `PUT` | `/api/task/:id` | Update task by ID |
| `DELETE` | `/api/task/:id` | Delete task by ID |

### Profile Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/api/user/profile` | Update user profile (name & photo) |

### Request Headers

All authenticated requests include:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json (or multipart/form-data for file uploads)
```

### Example API Call Flow

```javascript
// 1. User submits login form
const onSubmit = async (values) => {
  try {
    // 2. Service layer makes API call
    const response = await checkUserLogin(values);
    
    // 3. Check if successful
    if (isSuccess(response)) {
      // 4. Store token
      localStorage.setItem("token", response.data.token);
      // 5. Navigate to dashboard
      router.push("/dashboard");
    }
  } catch (error) {
    // 6. Handle error with toast
    toast.error(error.message);
  }
};
```

---

## 🧩 Key Components

### 1. **Login Component** (`src/components/Login.jsx`)

**Purpose:** User authentication with email and password

**Features:**
- Email validation (valid format required)
- Password validation (minimum 6 characters)
- Loading state during submission
- Error message display
- Link to registration page
- Pre-filled demo credentials

**State:**
- `message` - Error message

**Form Validation (Zod Schema):**
```javascript
const schema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
```

**On Success:**
- Store JWT token in localStorage
- Store profile photo (if available)
- Redirect to `/dashboard`

---

### 2. **Register Component** (`src/components/Register/Register.jsx`)

**Purpose:** User registration with profile photo upload

**Features:**
- Name, email, password, confirm password fields
- Optional profile photo upload
- Password confirmation validation
- Multipart form-data support for file uploads
- Form reset after successful registration
- Link to login page

**Form Validation:**
```javascript
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6),
  photo: z.any().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords must match",
});
```

**File Upload:**
- Sends `FormData` when photo is selected
- Sends JSON when no photo is provided

---

### 3. **Dashboard Component** (`src/components/Dashboard/Dashboard.jsx`)

**Purpose:** Main dashboard for task management and profile management

**Features:**
- **Task Management:**
  - Create new tasks with title and description
  - Edit tasks inline with validation
  - Delete tasks with instant feedback
  - Search and filter tasks in real-time
  - Task list with hover effects

- **Profile Sidebar:**
  - Sliding sidebar triggered by avatar button
  - Avatar display and file upload
  - Edit profile name (email disabled)
  - Save changes with multipart/form-data support
  - Logout button
  - Mobile overlay for sidebar closure

**State:**
```javascript
const [tasks, setTasks] = useState([]);           // All tasks
const [editingId, setEditingId] = useState(null); // Currently editing task ID
const [searchTerm, setSearchTerm] = useState("");  // Search query
const [isProfileOpen, setIsProfileOpen] = useState(false);    // Profile sidebar toggle
const [isEditingProfile, setIsEditingProfile] = useState(false); // Profile edit mode
const [profileName, setProfileName] = useState(name);         // User name
const [profileImage, setProfileImage] = useState(profileUrl); // Avatar data URL
const [isSavingProfile, setIsSavingProfile] = useState(false); // Save loading state
```

**Forms:**
- **Create Task Form:** Uses `react-hook-form` with Zod validation
- **Edit Task Form:** Separate `useForm` instance for inline editing

**Task Validation Schema:**
```javascript
const taskSchema = z.object({
  title: z.string().min(1, { message: "Task title is required" }),
  description: z.string().min(1, { message: "Task description is required" }),
});
```

**Key Functions:**
- `getTasks()` - Fetch all tasks from backend
- `onCreateTask(values)` - Create new task with validation
- `onUpdateTask(values)` - Update task and refresh list
- `deleteTask(id, taskTitle)` - Delete task with confirmation toast
- `saveProfile()` - Update user name and photo
- `handleLogout()` - Clear token and redirect to login

**Profile Photo:**
- Converted from FileReader to data URL
- Stored in localStorage
- Sent as Blob in FormData to backend

---

### 4. **ToastProvider Component** (`src/components/Toast/ToastProvider.jsx`)

**Purpose:** Global notification system

**Features:**
- Success toasts for all operations
- Error toasts for failed operations
- Auto-dismiss notifications
- Consistent styling across app

**Usage:**
```javascript
import { toast } from "react-toastify";

toast.success("Profile updated successfully!");
toast.error("Error while updating profile!");
```

---

## 📋 Forms & Validation

### Form Management Stack
- **react-hook-form** - Lightweight form state management
- **@hookform/resolvers** - Integration with Zod for validation
- **Zod** - TypeScript-first schema validation

### Form Features
- ✅ Real-time field validation
- ✅ Error messages below each field
- ✅ Submit button disabled during loading
- ✅ Loading state text ("Saving...", "Adding...", etc.)
- ✅ Form reset after successful submission

### Example: Create Task Form

```jsx
const taskSchema = z.object({
  title: z.string().min(1, { message: "Task title is required" }),
  description: z.string().min(1, { message: "Task description is required" }),
});

const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
  resolver: zodResolver(taskSchema),
});

const onCreateTask = async (values) => {
  const res = await createTasks(values);
  if (isSuccess(res)) {
    toast.success("Task created successfully!");
    reset(); // Clear form
    getTasks(); // Refresh list
  }
};

// In JSX:
<input {...register("title")} />
{errors.title && <p className="text-red-600">{errors.title.message}</p>}
```

---

## 🎯 State Management

### Client-Side State
The application uses **React Hooks** for state management:

```javascript
// Component-level state
const [tasks, setTasks] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [profileName, setProfileName] = useState("");

// Form state (via react-hook-form)
const { register, handleSubmit, formState: { errors } } = useForm();
```

### Local Storage
```javascript
// Token storage (set on login)
localStorage.setItem("token", response.data.token);
localStorage.getItem("token");
localStorage.removeItem("token");

// Profile photo storage
localStorage.setItem("profile", photoDataURL);
```

### JWT Token Structure
The app stores and decodes JWT tokens:
```javascript
// Decoding JWT (in getUserDetails())
const payload = token.split(".")[1];     // Get payload part
const decoded = atob(payload);           // Base64 decode
const user = JSON.parse(decoded);        // Parse JSON

// User data from JWT includes: name, email, etc.
```

---

## 🔐 Authentication & Security

### Authentication Flow

```
1. User enters credentials → Login Component
   ↓
2. POST /api/auth/login with credentials
   ↓
3. Backend validates → Returns JWT token + photo
   ↓
4. Token stored in localStorage
   ↓
5. Axios interceptor adds Authorization header to all requests
   Authorization: Bearer <jwt_token>
   ↓
6. Protected routes accessible
```

### Authorization Header Injection

**File:** `src/service/axios.js`

```javascript
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token') || '';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
);
```

### Error Handling (401 Unauthorized)

**Response Interceptor:**
```javascript
if (response && response.status === 401) {
  const message = response?.data?.message || "";
  if (message.toLowerCase().includes("invalid") || 
      message.toLowerCase().includes("expired") || 
      message.toLowerCase().includes("token")) {
    // Clear token
    localStorage.removeItem("token");
    // Redirect to login
    window.location.href = "/";
  }
}
```

### Token Expiry Handling
- Automatic logout on 401 response
- Toast notification on auth error
- Redirect to login page
- Token cleared from localStorage

---

## 🛡️ Middleware & Route Protection

### Middleware File: `middleware.js`

**Purpose:** Server-side route protection before page load

**How it Works:**
1. Check for `token` cookie in request
2. If user is not authenticated and accessing protected route → redirect to `/`
3. If authenticated → proceed to requested page

**Configuration:**
```javascript
const protectedRoutes = ["/middleware"];

export const config = {
  matcher: ["/middleware"], // Static array (required by Next.js)
};
```

**Important Notes:**
- Middleware runs on the **server**, not in browser
- It checks for a **cookie** (not localStorage)
- You must set a `token` cookie on login for middleware to work

### Setting Cookie on Login

To make middleware work, set a token cookie after successful login:

```javascript
// Client-side, after login success
const token = response.data.token;
document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`;
```

Or have your backend set the cookie via `Set-Cookie` header (recommended for security).

### Protected Routes
- `/middleware` - Currently protected
- **To add more routes:** Update `protectedRoutes` array and `config.matcher` in `middleware.js`

Example:
```javascript
const protectedRoutes = ["/dashboard", "/profile"];

export const config = {
  matcher: ["/dashboard", "/profile", "/app/:path*"],
};
```

---

## ⚠️ Error Handling

### Error Handling Strategy

**1. Axios Response Interceptor**
- Catches all HTTP errors
- Checks for 401 status (token expiry)
- Auto-logout and redirect on auth errors

**2. Try-Catch Blocks**
- Wrap all async operations
- Catch network errors
- Display user-friendly error messages

**3. Toast Notifications**
- Show error messages to user
- Include backend error details if available

### Error Message Display

```javascript
try {
  const res = await createTasks(values);
  if (isSuccess(res)) {
    toast.success("Success!");
  } else {
    toast.error("Operation failed!");
  }
} catch (error) {
  // Use backend message if available
  toast.error(error?.response?.data?.message || "Unknown error");
  console.error(error);
}
```

### User Feedback
- **Success Operations:** Green toast with message
- **Error Operations:** Red toast with error detail
- **Loading States:** Button text changes ("Adding...", "Saving...")
- **Validation Errors:** Text appears below each form field in red

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Opens at `http://localhost:3000` with hot-reload enabled.

### Build for Production
```bash
npm run build
```
Creates optimized production build in `.next` directory.

### Start Production Server
```bash
npm start
```
Runs the production build (requires `npm run build` first).

### Linting
```bash
npm run lint
```
Checks code for ESLint violations.

---

## 🌐 Deployment

### Prerequisites
- Node.js 18+ installed on server
- Backend API deployed and accessible
- Environment variable `NEXT_PUBLIC_BASE_URL` configured

### Vercel Deployment (Recommended)

**Step 1:** Connect GitHub repository to Vercel
```
https://vercel.com/import
```

**Step 2:** Set environment variable in Vercel dashboard
```
NEXT_PUBLIC_BASE_URL = https://api.your-domain.com
```

**Step 3:** Deploy
```
Vercel auto-deploys on push to main branch
```

### Manual Server Deployment

**Step 1:** Build the application
```bash
npm run build
```

**Step 2:** Install production dependencies
```bash
npm ci --production
```

**Step 3:** Set environment variable
```bash
export NEXT_PUBLIC_BASE_URL=https://api.your-domain.com
```

**Step 4:** Start the server
```bash
npm start
```

### Docker Deployment

**Create Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY .next ./.next
COPY public ./public
ENV NEXT_PUBLIC_BASE_URL=https://api.your-domain.com
EXPOSE 3000
CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t primetrade-frontend .
docker run -p 3000:3000 primetrade-frontend
```

---

## 🤝 Contributing

### Development Workflow

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit:
```bash
git add .
git commit -m "Add feature description"
```

3. Push to GitHub:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub

### Code Guidelines
- Use functional components with React Hooks
- Use Zod for all form validation
- Add error handling with try-catch blocks
- Include toast notifications for user feedback
- Keep components small and focused
- Use Tailwind CSS for styling
- Follow ESLint rules

### Testing
- Test login/register flows
- Test task CRUD operations
- Test profile updates
- Test search/filter functionality
- Test error scenarios (401, network errors)
- Test responsive design on mobile/tablet

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- **GitHub Issues:** [Open an issue](https://github.com/AbdulMaaz909/premetrade_frontend/issues)
- **Email:** abdulmaaz827@gmail.com

---

## 📄 License

This project is part of the PrimeTrade Assessment. All rights reserved.

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/)

---

**Built with ❤️ by Abdul Maaz**

Last Updated: December 4, 2025

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
