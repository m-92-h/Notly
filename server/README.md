# Todo App Server

RESTful API server for task management application using Node.js, Express, and MongoDB

---

## 📋 Project Structure

```
server/
├── config/                 # Application configuration
│   ├── db.js              # MongoDB connection
│   └── settings.js        # General settings (CORS, JWT)
├── models/                # Data models
│   ├── user.js            # User model
│   └── note.js            # Task model
├── controllers/           # Business logic
│   ├── userController.js  # User operations
│   └── noteController.js  # Task operations
├── middlewares/           # Middlewares
│   ├── authentication.js  # Token verification
│   ├── authorization.js   # Permission verification
│   ├── rateLimiter.js     # Request rate limiting
│   └── validate.js        # Input data validation
├── routes/                # Routes
│   ├── userRoutes.js      # User routes
│   └── noteRoutes.js      # Task routes
├── server.js              # Main entry point
└── .env.example           # Environment variables template
```

---

## 🔧 Libraries Used

| Library              | Description             |
| -------------------- | ----------------------- |
| `express`            | Web framework           |
| `mongoose`           | MongoDB ORM             |
| `socket.io`          | Real-time communication |
| `jsonwebtoken`       | Token encryption        |
| `bcryptjs`           | Password encryption     |
| `cors`               | Cross-origin requests   |
| `helmet`             | Headers protection      |
| `morgan`             | Request logging         |
| `express-rate-limit` | Request rate limiting   |

---

## 📦 Requirements

- **Node.js** v16+
- **npm** or **yarn**
- **MongoDB** (local or cloud)

---

## ⚙️ Installation & Setup

### 1️⃣ Copy environment file

```bash
cp .env.example .env
```

### 2️⃣ Edit environment variables

```env
JWT_SECRET=your_secure_secret_key_here
PORT=3000
DATABASE_URL=mongodb://localhost:27017/todo-app
```

**💡 Tip:** To generate a strong random key for `JWT_SECRET`, use:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Then copy the output and paste it as your `JWT_SECRET` value.

### 3️⃣ Install dependencies

```bash
npm install
```

---

## 🚀 Running

### Development mode (with auto-reload)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

Server will run on: `http://localhost:3000`

---

## 📡 Main API Endpoints

### User

- `POST /api/users/register` - Register new account
- `POST /api/users/login` - Login
- `GET /api/users/me` - Get current user data

### Tasks

- `GET /api/notes` - Get all tasks
- `POST /api/notes` - Create new task
- `PUT /api/notes/:id` - Update task
- `DELETE /api/notes/:id` - Delete task

---

## 🔐 Security Features

✅ Password encryption with bcryptjs  
✅ JWT token verification  
✅ Permission verification  
✅ Request rate limiting  
✅ Headers protection with Helmet

---

## 📝 Notes

- Use `DATABASE_URL` with MongoDB Atlas for production
- Change `JWT_SECRET` to a strong random key
- Do not commit `.env` file to Git
