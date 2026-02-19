# 🏦 Money Manager Application

A full-stack personal finance management application built with a **Spring Boot** backend and a **React.js** frontend. It enables users to track income and expenses, manage categories, view a real-time dashboard, filter transactions, and receive automated daily email notifications.

---

## 📑 Table of Contents

1. [Project Overview](#-project-overview)
2. [Architecture](#-architecture)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Database Schema](#-database-schema)
6. [REST API Endpoints](#-rest-api-endpoints)
7. [Frontend Pages & Routes](#-frontend-pages--routes)
8. [Automated Scheduler Jobs](#-automated-scheduler-jobs)
9. [Security Model](#-security-model)
10. [Environment Variables](#-environment-variables)
11. [Setup & Installation](#-setup--installation)
12. [Screenshots](#-screenshots)

---

## 📖 Project Overview

Money Manager is a **personal finance tracker** that helps individuals:

- Record daily **income** and **expense** transactions tied to custom categories
- View a **dashboard** with balance summary, recent transactions, and chart data
- **Filter** transactions by date range, keyword, and sort order
- Receive **automated email reminders** every evening to log transactions
- Receive a **daily expense summary** email with an HTML table of the day's spending
- Manage their **user profile** secured behind JWT-based authentication

The application follows a clean **client-server architecture**: a React SPA communicates with a Spring Boot REST API over HTTP, using JWT tokens for stateless authentication.

---

## 🏗 Architecture

```
┌─────────────────────────────────────┐
│           React.js Frontend          │
│  (Vite + TailwindCSS + Recharts)    │
│                                     │
│  Pages: Login │ Signup │ Dashboard  │
│         Income │ Expense │ Category │
│         Filter                      │
└────────────────┬────────────────────┘
                 │  HTTP REST (JSON)
                 │  Authorization: Bearer <JWT>
┌────────────────▼────────────────────┐
│        Spring Boot Backend           │
│  Context path: /api/v1.0            │
│                                     │
│  Controllers → Services → Repos     │
│  Spring Security + JWT Filter       │
│  Spring Scheduler (email jobs)      │
└────────────────┬────────────────────┘
                 │  JPA / Hibernate
      ┌──────────▼──────────┐
      │   MySQL Database     │
      │  tbl_profiles        │
      │  tbl_categories      │
      │  tbl_incomes         │
      │  tbl_expenses        │
      └──────────────────────┘
                 │  JavaMailSender
      ┌──────────▼──────────┐
      │   Gmail SMTP Server  │
      └──────────────────────┘
```

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 21 | Primary language |
| Spring Boot | 3.5.7 | Application framework |
| Spring Security | (Boot-managed) | Authentication & authorization |
| Spring Data JPA / Hibernate | (Boot-managed) | ORM & database access |
| Spring Mail | (Boot-managed) | Email delivery via SMTP |
| Spring Scheduler | (Boot-managed) | Automated cron jobs |
| JWT (JJWT) | 0.11.5 | Stateless token-based auth |
| MySQL | — | Primary relational database |
| PostgreSQL | — | Alternative database (runtime) |
| Lombok | (Boot-managed) | Boilerplate reduction |
| Apache POI | 5.2.5 | Excel export support |
| Maven | — | Build & dependency management |
| SLF4J | (Boot-managed) | Structured logging |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React.js | 19.x | UI framework |
| Vite | 7.x | Build tool & dev server |
| React Router DOM | 7.x | Client-side routing |
| TailwindCSS | 4.x | Utility-first CSS styling |
| Recharts | 3.x | Chart visualizations |
| Axios | 1.x | HTTP client for API calls |
| React Hot Toast | 2.x | Toast notifications |
| Lucide React | 0.55x | Icon library |
| Moment.js | 2.x | Date formatting |
| Emoji Picker React | 4.x | Emoji selection for categories |

---

## 📁 Project Structure

```
Money-Mangement-Application/
│
├── Money-manger/                        # React.js Frontend
│   ├── src/
│   │   ├── App.jsx                      # Root component & route definitions
│   │   ├── main.jsx                     # React DOM entry point
│   │   ├── index.css                    # Global styles
│   │   ├── context/
│   │   │   └── AppContext.jsx           # Global state (auth, user data)
│   │   ├── hooks/                       # Custom React hooks
│   │   ├── util/                        # Utility helpers (e.g., axios config)
│   │   ├── pages/
│   │   │   ├── Login.jsx                # Login page
│   │   │   ├── Signup.jsx               # Registration page
│   │   │   ├── DashoardHome.jsx         # Dashboard overview page
│   │   │   ├── Income.jsx               # Income management page
│   │   │   ├── Expense.jsx              # Expense management page
│   │   │   ├── Category.jsx             # Category management page
│   │   │   └── Filter.jsx               # Transaction filter page
│   │   └── components/
│   │       ├── Sidebar.jsx              # Navigation sidebar
│   │       ├── Menubar.jsx              # Top menu bar
│   │       ├── Dashboard.jsx            # Dashboard widgets & charts
│   │       ├── IncomeList.jsx           # Income transaction list
│   │       ├── ExpenseList.jsx          # Expense transaction list
│   │       ├── CategoryList.jsx         # Category list
│   │       ├── AddIncomeForm.jsx        # Form to add income
│   │       ├── AddExpenseForm.jsx       # Form to add expense
│   │       ├── AddCategoryForm.jsx      # Form to add category
│   │       ├── EmojiPickerPopUp.jsx     # Emoji picker modal
│   │       ├── Input.jsx                # Reusable input component
│   │       └── Model.jsx                # Reusable modal component
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── MoneyManagerApplication/             # Spring Boot Backend
    └── src/main/java/com/danny/MoneyManagerApplication/
        ├── MoneyManagerApplication.java # Main entry point
        ├── config/
        │   └── SecurityConfig.java      # Spring Security & CORS config
        ├── controller/
        │   ├── HomeController.java      # Health check endpoints
        │   ├── ProfileController.java   # User auth & profile endpoints
        │   ├── IncomeController.java    # Income CRUD endpoints
        │   ├── ExpenseController.java   # Expense CRUD endpoints
        │   ├── CategoryController.java  # Category CRUD endpoints
        │   ├── DashboardController.java # Dashboard summary endpoint
        │   └── FilterController.java   # Transaction filter endpoint
        ├── service/
        │   ├── ProfileService.java      # User registration, login, JWT
        │   ├── IncomeService.java       # Income business logic
        │   ├── ExpenseService.java      # Expense business logic
        │   ├── CategoryService.java     # Category business logic
        │   ├── DashboardService.java    # Dashboard aggregation logic
        │   ├── EmailService.java        # Email sending abstraction
        │   ├── NotificationService.java # Scheduled email jobs
        │   └── AppUserDetailService.java# Spring Security UserDetailsService
        ├── entity/
        │   ├── ProfileEntity.java       # User/profile DB table
        │   ├── CategoryEntity.java      # Category DB table
        │   ├── IncomeEntity.java        # Income DB table
        │   └── ExpenseEntity.java       # Expense DB table
        ├── repository/
        │   ├── ProfileRepository.java
        │   ├── CategoryRepository.java
        │   ├── IncomeRepository.java
        │   └── ExpenseRepository.java
        ├── DTO/
        │   ├── AuthDTO.java             # Login request body
        │   ├── ProfileDTO.java          # User profile transfer object
        │   ├── IncomeDTO.java           # Income transfer object
        │   ├── ExpenseDTO.java          # Expense transfer object
        │   ├── CategoryDTO.java         # Category transfer object
        │   ├── FilterDTO.java           # Filter request body
        │   └── RecentTransactionDTO.java# Combined transaction object
        ├── security/
        │   └── JwtRequestFilter.java    # JWT validation filter
        └── util/
            └── JwtUtil.java             # JWT generation & validation
```

---

## 🗄 Database Schema

All tables are auto-created/updated by Hibernate (`spring.jpa.hibernate.ddl-auto=update`).

### `tbl_profiles`
| Column | Type | Description |
|---|---|---|
| `id` | BIGINT (PK, auto) | Unique user identifier |
| `full_name` | VARCHAR | User's full name |
| `email` | VARCHAR (unique) | Login email address |
| `password` | VARCHAR | BCrypt-hashed password |
| `profile_image_url` | VARCHAR | Optional avatar URL |
| `is_active` | BOOLEAN | Account activation status (default `false`) |
| `activation_token` | VARCHAR | UUID token for email activation |
| `create_at` | DATETIME | Record creation timestamp |
| `update_at` | DATETIME | Last update timestamp |

### `tbl_categories`
| Column | Type | Description |
|---|---|---|
| `id` | BIGINT (PK, auto) | Unique category identifier |
| `name` | VARCHAR | Category name (e.g., "Food", "Salary") |
| `type` | VARCHAR | `"income"` or `"expense"` |
| `icon` | VARCHAR | Emoji or icon code |
| `profile_id` | BIGINT (FK) | Owning user |
| `created_at` | DATETIME | Creation timestamp |
| `updated_at` | DATETIME | Last update timestamp |

### `tbl_incomes`
| Column | Type | Description |
|---|---|---|
| `id` | BIGINT (PK, auto) | Unique income identifier |
| `name` | VARCHAR | Description (e.g., "Freelance payment") |
| `icon` | VARCHAR | Emoji or icon code |
| `amount` | DECIMAL | Income amount |
| `date` | DATE | Transaction date (defaults to today) |
| `category_id` | BIGINT (FK) | Associated category |
| `profile_id` | BIGINT (FK) | Owning user |
| `created_at` | DATETIME | Creation timestamp |
| `updated_at` | DATETIME | Last update timestamp |

### `tbl_expenses`
| Column | Type | Description |
|---|---|---|
| `id` | BIGINT (PK, auto) | Unique expense identifier |
| `name` | VARCHAR | Description (e.g., "Groceries") |
| `icon` | VARCHAR | Emoji or icon code |
| `amount` | DECIMAL | Expense amount |
| `date` | DATE | Transaction date (defaults to today) |
| `category_id` | BIGINT (FK) | Associated category |
| `profile_id` | BIGINT (FK) | Owning user |
| `created_at` | DATETIME | Creation timestamp |
| `updated_at` | DATETIME | Last update timestamp |

---

## 🌐 REST API Endpoints

**Base URL:** `http://localhost:8080/api/v1.0`

All endpoints except those marked **[Public]** require the header:
```
Authorization: Bearer <JWT_TOKEN>
```

### 🏥 Health Check
| Method | Endpoint | Description |
|---|---|---|
| GET | `/status` | Health check — returns `"application is running"` [Public] |
| GET | `/health` | Alias for `/status` [Public] |

### 👤 Profile / Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/profile/register` | Register a new user — sends activation email [Public] |
| GET | `/profile/activate?activationToken={token}` | Activate account via email link [Public] |
| POST | `/profile/login` | Authenticate and receive JWT token [Public] |
| GET | `/profile/me` | Get currently authenticated user's profile |
| GET | `/profile/public` | Get public profile of authenticated user |

**Login request body:**
```json
{ "email": "user@example.com", "password": "secret" }
```
**Login response:**
```json
{
  "token": "<JWT>",
  "user": { "id": 1, "fullName": "John Doe", "email": "user@example.com" }
}
```

### 💰 Income
| Method | Endpoint | Description |
|---|---|---|
| POST | `/income/add` | Add a new income entry |
| GET | `/income` | Get all incomes for the current month |
| DELETE | `/income/{id}` | Delete an income by ID (ownership validated) |

### 💸 Expense
| Method | Endpoint | Description |
|---|---|---|
| POST | `/expense/add` | Add a new expense entry |
| GET | `/expense` | Get all expenses for the current month |
| DELETE | `/expense/{id}` | Delete an expense by ID (ownership validated) |

### 🗂 Categories
| Method | Endpoint | Description |
|---|---|---|
| POST | `/categories/save` | Create a new category |
| GET | `/categories` | Get all categories for the current user |
| GET | `/categories/{type}` | Get categories filtered by type (`income` or `expense`) |
| PUT | `/categories/{categoryId}` | Update an existing category |

### 📊 Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard` | Get dashboard summary data |

**Dashboard response includes:**
```json
{
  "totalBalance": 5000.00,
  "totalIncome": 10000.00,
  "totalExpense": 5000.00,
  "recent5Income": [...],
  "recent5Expenses": [...],
  "recentTransactions": [...]
}
```

### 🔍 Filter
| Method | Endpoint | Description |
|---|---|---|
| POST | `/filter` | Filter income or expense transactions |

**Filter request body:**
```json
{
  "type": "expense",
  "startDate": "2025-01-01",
  "endDate": "2025-11-30",
  "keyword": "food",
  "sortField": "date",
  "sortOrder": "desc"
}
```

---

## 🖥 Frontend Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/login` | `Login.jsx` | Login form with JWT storage |
| `/signup` | `Signup.jsx` | New user registration form |
| `/dashboard` | `DashoardHome.jsx` | Overview: balance, charts, recent transactions |
| `/income` | `Income.jsx` | List & add income transactions |
| `/expense` | `Expense.jsx` | List & add expense transactions |
| `/category` | `Category.jsx` | Manage income/expense categories |
| `/filter` | `Filter.jsx` | Filter & sort transactions by date/keyword |

The application uses React Context (`AppContext`) for global state management (user info, auth token). API communication is handled via Axios with JWT attached to every request header.

---

## 🔔 Automated Scheduler Jobs

Implemented in `NotificationService.java` using Spring's `@Scheduled` annotation:

| Job | Cron | Timezone | Description |
|---|---|---|---|
| Daily Reminder | `0 0 22 * * *` | IST | Sends an email to all users reminding them to log their income and expenses for the day |
| Daily Expense Summary | `0 0 23 * * *` | Asia/Kolkata | Sends an HTML-formatted table of each user's expenses recorded that day (only sent if the user has at least one expense) |

---

## 🔐 Security Model

- **Password Hashing:** BCrypt via Spring Security's `PasswordEncoder`
- **Authentication:** Stateless JWT — no server-side sessions
- **JWT Filter:** `JwtRequestFilter` intercepts every request, extracts the `Authorization: Bearer` token, validates it, and populates the `SecurityContext`
- **Account Activation:** Newly registered users receive an email with a UUID activation link; login is blocked until the account is activated
- **CORS:** Configured to allow all origins (`*`) with GET, POST, DELETE, and OPTIONS methods
- **Public Endpoints:** `/status`, `/health`, `/profile/register`, `/profile/login`, `/profile/activate`
- **Protected Endpoints:** All other endpoints require a valid JWT

---

## ⚙️ Environment Variables

The backend reads the following environment variables (set them in your shell or deployment config):

| Variable | Description |
|---|---|
| `DB_USERNAME` | MySQL database username |
| `DB_PASSWORD` | MySQL database password |
| `EMAIL_URL` | Base URL used in the account activation link (e.g., `https://yourdomain.com`) |
| `EMAIL_USERNAME` | Gmail address used as SMTP sender |
| `APP_PASSWORD` | Gmail App Password (16-character, not your regular password) |
| `JWT_SECRATE` | Secret key used to sign JWT tokens (use a long random string) |
| `MONEY_MANAGER_FRONTED` | Frontend URL used in reminder emails (e.g., `https://your-frontend.com`) |

---

## 🚀 Setup & Installation

### Prerequisites
- Java 21+
- Maven 3.8+
- Node.js 18+ & npm
- MySQL 8+ (or PostgreSQL)
- Gmail account with App Password enabled

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd MoneyManagerApplication

# 2. Set the required environment variables (example for Linux/macOS)
export DB_USERNAME=root
export DB_PASSWORD=yourpassword
export EMAIL_URL=http://localhost:8080
export EMAIL_USERNAME=your@gmail.com
export APP_PASSWORD=yourapppassword
export JWT_SECRATE=a-very-long-secret-key
export MONEY_MANAGER_FRONTED=http://localhost:5173

# 3. Create the database in MySQL
mysql -u root -p -e "CREATE DATABASE moneymanagement;"

# 4. Build and run the application
mvn spring-boot:run
# Backend starts at: http://localhost:8080/api/v1.0
```

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd Money-manger

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# Frontend starts at: http://localhost:5173
```

---

## 📸 Screenshots

### Login / Authentication
<img width="1920" height="1080" alt="Login Screen" src="https://github.com/user-attachments/assets/7e1da79b-6bb6-4118-ab02-d6382fb4e99c" />

### Dashboard
<img width="1920" height="1080" alt="Dashboard" src="https://github.com/user-attachments/assets/ee063bc7-d8b3-4e1e-9a7d-fe0a77f4fcf3" />

### Income Management
<img width="1920" height="1080" alt="Income Page" src="https://github.com/user-attachments/assets/3124837c-395f-4546-9575-cc8c2db1bea9" />

### Expense Management
<img width="1920" height="1080" alt="Expense Page" src="https://github.com/user-attachments/assets/0b78f9c1-6cae-49d0-8eae-5b79a073cc5d" />

### Category Management
<img width="1920" height="1080" alt="Category Page" src="https://github.com/user-attachments/assets/b9a8ec93-16e4-4e80-a07a-d5225c55a024" />

---

❤️ **Thank you for exploring the Money Manager App!**

If this project helped you or inspired you, consider giving it a ⭐ on GitHub.
Every star motivates me to build even more awesome projects. 🚀

— Happy Coding & Keep Building!
