# 📚 Documentation

Complete guide and screenshots for the Todo App project.

---

## 📂 Structure

```
documentation/
├── screenshots/
│   ├── desktop-views/        # Desktop UI screenshots
│   │   ├── dashboard-full/   # Full dashboard with tasks
│   │   │   ├── dark-mode.png
│   │   │   └── light-mode.png
│   │   └── dashboard-empty/  # Empty dashboard state
│   │       ├── dark-mode.png
│   │       └── light-mode.png
│   ├── mobile-views/         # Mobile UI screenshots
│   │   ├── dashboard-full/   # Full dashboard on mobile
│   │   │   ├── dark-mode.png
│   │   │   └── light-mode.png
│   │   └── dashboard-empty/  # Empty state on mobile
│   │       ├── dark-mode.png
│   │       └── light-mode.png
│   └── modals/               # Modal dialogs and forms
│       ├── auth-pages/       # Authentication screens
│       │   ├── login-dark.png
│       │   ├── login-light.png
│       │   ├── register-dark.png
│       │   └── register-light.png
│       └── edit-note/        # Note editing modal
│           ├── dark-mode.png
│           └── light-mode.png
└── README.md                 # Documentation guide
```

---

## 🖼️ Screenshots Overview

### Desktop Views

- **dashboard-full/** - Shows complete dashboard with multiple tasks, demonstrating:
    - Task cards layout
    - Navigation bar
    - Sidebar with theme toggle
    - Task counters and filters

- **dashboard-empty/** - Shows initial state with:
    - Empty message
    - UI structure without data

### Mobile Views

- **dashboard-full/** - Responsive design on mobile:
    - Collapsed navigation
    - Touch-friendly interface
    - Full task management on mobile devices

- **dashboard-empty/** - Mobile empty state:
    - Mobile-optimized layout
    - Responsive sidebar/offcanvas menu

### Modals

- **auth-pages/** - Authentication screens:
    - **login-light.png / login-dark.png** - User login interface
    - **register-light.png / register-dark.png** - User registration form

- **edit-note/** - Task editing modal:
    - **light-mode.png / dark-mode.png** - Create and edit task form

---

## 🎨 Theme Variants

All screenshots come in two variants:

| File             | Description                              |
| ---------------- | ---------------------------------------- |
| `light-mode.png` | Light theme - good for daytime viewing   |
| `dark-mode.png`  | Dark theme - reduced eye strain at night |

---

## 💡 Usage Tips

When showcasing the app:

- Use **desktop-views/dashboard-full/light-mode.png** as the primary hero image
- Show **desktop-views/dashboard-full/dark-mode.png** to highlight theme flexibility
- Use **mobile-views/dashboard-full/** to demonstrate responsive design
- Use **modals/auth-pages/login-light.png** to show authentication flow
- Use **modals/edit-note/light-mode.png** to demonstrate task creation/editing

---

## 📝 Notes

All screenshots capture the functional UI at production quality. They reflect the latest component designs and styling applied from Tailwind CSS.

For detailed project information and setup instructions, refer to the main [README.md](../README.md) in the project root.
