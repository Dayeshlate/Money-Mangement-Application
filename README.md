🏦 Money Manager Application
A complete personal finance management backend built using Spring Boot, JWT Authentication, MySQL, JPA, and Scheduler-based Email Notifications.
This application helps users manage their income, expenses, categories, view a dashboard overview, apply filters, and receive daily email reminder/summary notifications.

🛠 Tech Stack

Frontend

The Money Manager frontend is built using React.js with a clean component-based architecture. It communicates with the backend via REST APIs and supports JWT-based authentication. All sensitive routes use ProtectedRoute with token verification.

Backend

The Money Manager Application is built using Spring Boot 3 with Java 17 as the backend engine, providing a modern and robust framework for building RESTful APIs. For authentication and authorization, the project uses Spring Security combined with JWT (JSON Web Tokens) to deliver secure, stateless user sessions. The database layer is powered by MySQL (or PostgreSQL, depending on environment), accessed via Hibernate and JPA for seamless ORM and entity management. Logging is handled through SLF4J, ensuring structured and developer-friendly logs. For notification features, the application uses JavaMailSender to deliver emails, while scheduled background tasks such as daily reminders or summaries are implemented using Spring’s @Scheduled annotation. The build system used throughout the project is Maven, allowing clean dependency management and packaging.
On the frontend, a modern React.js application consumes these REST APIs, enabling smooth UI interactions, state management, and API communication.


🚀 Features
🔐 Authentication & Authorization

User registration with activation email
Login with JWT generation
Token-based authorization
Protected endpoints (only accessible with valid JWT)


<img width="1920" height="1080" alt="Screenshot 2025-11-29 095547" src="https://github.com/user-attachments/assets/7e1da79b-6bb6-4118-ab02-d6382fb4e99c" />


👤 User Profile

Register new user
Activate account through email token
Fetch current logged-in profile

💰 Income & Expense Management

Add Income
Add Expense
Validation with associated category
Delete expense/income with ownership check
Fetch latest 5 incomes/expenses
Calculate total income, total expense & balance


<img width="1920" height="1080" alt="Screenshot 2025-11-24 171230" src="https://github.com/user-attachments/assets/3124837c-395f-4546-9575-cc8c2db1bea9" />

<img width="1920" height="1080" alt="Screenshot 2025-11-24 171244" src="https://github.com/user-attachments/assets/0b78f9c1-6cae-49d0-8eae-5b79a073cc5d" />

🗂 Categories

Create categories (Income/Expense type)
Validation: Prevent duplicate category names
Category-based expense/income tracking


<img width="1920" height="1080" alt="Screenshot 2025-11-24 171217" src="https://github.com/user-attachments/assets/b9a8ec93-16e4-4e80-a07a-d5225c55a024" />

📊 Dashboard

Combined list of income & expense transactions
Sorted by most recent
Total balance calculation
Recent 5 transactions
Summaries for charts


<img width="1920" height="1080" alt="Screenshot 2025-11-25 185314" src="https://github.com/user-attachments/assets/ee063bc7-d8b3-4e1e-9a7d-fe0a77f4fcf3" />


🔔 Email Notifications (Scheduler)

Automated emails using Spring Scheduler:
Daily 10 PM: Reminder to add expenses/income
Daily 11 PM: Expense summary of the day (HTML table)

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

❤️ Thank you for exploring the Money Manager App!

If this project helped you or inspired you, consider giving it a ⭐ on GitHub.
Every star motivates me to build even more awesome projects. 🚀

— Happy Coding & Keep Building!
