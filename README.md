# 🌟 Full Stack Login & Signup Project

This is a Full Stack Authentication Project built using:

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- SQLite Database

It includes:

✔ Welcome Page  
✔ Signup Page  
✔ Login Page  
✔ Password Hashing  
✔ Form Validation  
✔ Responsive Design  
✔ SQLite Database Storage  

---

# 📁 Project Structure

```
fullstack-auth-project/
│
├── server.js
├── package.json
├── database.db
│
├── /public
│   ├── /css
│   │   └── style.css
│   ├── /js
│   │   └── main.js
│   ├── /images
│   │   └── bg.jpg
│   ├── index.html
│   ├── signup.html
│   └── login.html
```

---

# 🚀 How To Run The Project

## 1️⃣ Install Node Modules

Open terminal in project folder and run:

```
npm install
```

If needed:

```
npm install express sqlite3 bcryptjs express-session body-parser
```

---

## 2️⃣ Start Server

```
node server.js
```

Now open:

```
http://localhost:3000
```

---

# 🗄 How Database Works (SQLite)

This project uses **SQLite**, which is a lightweight database stored in a single file.

When you run the server for the first time:

- A file called `database.db` is automatically created.
- Inside it, a table named `users` is created.

### Users Table Structure

| Column   | Type    | Description |
|----------|---------|------------|
| id       | INTEGER | Primary key (auto increases) |
| username | TEXT    | Unique username |
| email    | TEXT    | Unique email |
| password | TEXT    | Hashed password |

---

### 🔐 Important: Password Security

Passwords are NOT stored directly.

Before saving:
- Password is hashed using **bcrypt**
- The hashed password is stored in database

So even if someone sees the database file, they cannot see real passwords.

---

# 🖥 How Backend Works (Node.js + Express)

The backend is written in `server.js`.

### Step 1: Server Setup

- Express creates a server.
- Middleware is used:
  - `body-parser` → reads form data
  - `express-session` → manages login session
  - `express.static()` → serves frontend files

---

### Step 2: Database Connection

```
const db = new sqlite3.Database("./database.db");
```

This connects the server to SQLite database file.

If the table does not exist, it creates it automatically.

---

### Step 3: Signup Process

When user clicks **Create Account**:

1. Frontend sends data using `fetch()` to `/signup`
2. Backend receives:
   - username
   - email
   - password
3. Backend checks:
   - All fields required
   - Password length
4. Password is hashed
5. Data is inserted into database
6. Response is sent back to frontend

---

### Step 4: Login Process

When user clicks **Login**:

1. Frontend sends email & password to `/login`
2. Backend searches email in database
3. If user exists:
   - bcrypt compares password
4. If correct:
   - Login success
   - Session is created
5. If wrong:
   - Error message returned

---

# 🎨 How Frontend Works

All frontend files are inside `/public` folder.

Express serves this folder automatically.

## Pages:

### 1️⃣ index.html
- Welcome page
- Animated background
- Buttons for Signup & Login

### 2️⃣ signup.html
- Username
- Email
- Password
- Show/Hide password icon
- Validation before sending data

### 3️⃣ login.html
- Email
- Password
- Show/Hide password
- Login validation

---

# ⚡ How Frontend Connects To Backend

Connection happens using:

```
fetch("/signup")
fetch("/login")
```

This sends data from frontend (browser) to backend (server).

Backend processes data and sends JSON response.

Frontend shows success or error message.

---

# 🛡 Validation System

Validation happens in TWO places:

### 1️⃣ Frontend Validation
- Checks empty fields
- Checks valid email format
- Checks password length

### 2️⃣ Backend Validation
- Prevents empty data
- Prevents short password
- Prevents duplicate users

Even if someone bypasses frontend, backend still protects the system.

---

# 🔄 How Session Works

When login is successful:

```
req.session.user = user;
```

This stores logged-in user info in session.

Session helps:
- Remember logged-in user
- Protect private routes (if added later)

---

# 📱 Responsive Design

The UI:
- Uses flexbox
- Uses media queries
- Adjusts automatically for mobile screens
- Glassmorphism effect with blur
- Smooth hover animations


