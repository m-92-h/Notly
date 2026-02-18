# Todo App Client

React frontend application for task management using Vite and Tailwind CSS

---

## 📋 Project Structure

```
client/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── EditModal.jsx   # Task editing modal
│   │   ├── LoginModal.jsx  # Login/Register modal
│   │   ├── Navbar.jsx      # Top navigation bar
│   │   ├── NoteCard.jsx    # Single task card
│   │   ├── NoteList.jsx    # Tasks list container
│   │   └── Sidebar.jsx     # Left sidebar
│   ├── services/           # API and utilities
│   │   ├── api.js          # API calls and hooks
│   │   └── theme.js        # Theme utilities
│   ├── App.jsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # React entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint rules
└── .env.example            # Environment variables template
```

---

## 🔧 Libraries Used

| Library                | Purpose                 |
| ---------------------- | ----------------------- |
| `react`                | UI library              |
| `react-dom`            | React DOM rendering     |
| `vite`                 | Build tool & dev server |
| `tailwindcss`          | Styling framework       |
| `tailwindcss-animate`  | Animation utilities     |
| `lucide-react`         | Icon library            |
| `@vitejs/plugin-react` | React plugin for Vite   |
| `eslint`               | Code linting            |

---

## 📦 Requirements

- **Node.js** v18+
- **npm** or **yarn**
- **Backend API** Either running locally on `http://localhost:3000` or a deployed instance.

---

## ⚙️ Installation & Setup

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Configure environment

Create a .env file in the root directory and add the following:

```env
# For Local Development
VITE_API_BASE_URL=http://localhost:3000/api

# For Production (Replace with your actual backend URL)
# VITE_API_BASE_URL=https://your-api-domain.com/api
```
---

## 🚀 Running

### Development mode (with hot reload)

```bash
npm run dev
```

Access at: `http://localhost:5173`

### Production build

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

---

## 📁 Component Overview

| Component          | Function                          |
| ------------------ | --------------------------------- |
| **App.jsx**        | Main application wrapper          |
| **Navbar.jsx**     | Header with user info & logout    |
| **Sidebar.jsx**    | Navigation & theme toggle         |
| **NoteList.jsx**   | Display all tasks                 |
| **NoteCard.jsx**   | Individual task card with actions |
| **EditModal.jsx**  | Create/update task form           |
| **LoginModal.jsx** | Login/register form               |

---

## 🔌 API Integration

All API calls are in `services/api.js`:

**User Functions:**
- `registerUser(userData)` - Register new user
- `loginUser(credentials)` - Login user and get token
- `getCurrentUser(token)` - Get current user data

**Task Functions (useNotes hook):**
- `fetchNotes(query, token)` - Fetch all user notes
- `createNote(noteData, token)` - Create new note
- `updateNote(id, updatedData, token)` - Update existing note
- `deleteNote(id, token)` - Delete a note

---

## 🎨 Styling

- **Tailwind CSS** for utilities
- **Lucide React** for icons
- **tailwindcss-animate** for animations
- Custom theme system in `services/theme.js`

---

## 🔒 Security

✅ JWT token stored safely  
✅ API requests authenticated with Bearer token  
✅ Environment variables for sensitive data  
✅ ESLint for code quality

---

## 📝 Notes

- Token stored in localStorage after login
- API base URL configured via `.env`
- Responsive design for all devices
- Real-time UI updates with React state
