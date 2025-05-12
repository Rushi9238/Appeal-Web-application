Appeals Web Application

A production‑ready Next.js 13 + TypeScript project that converts a Figma design into code, secures every route behind authentication, and ships with Redux Toolkit state‑management (persisted with redux‑persist), a collapsible sidebar, a dynamic CRUD data table, and a full‑featured calendar for events & reminders.

✨ Key Features

Category

Details

Authentication

All inside‑app routes are protected. Unauthenticated users are redirected to /login.

State Management

Redux Toolkit slices with automatic persistence via redux‑persist.

Sidebar Navigation

Responsive sidebar that collapses/expands on click, showing icons only or icons + labels.

Appeal Table

Re‑usable DataTable component wired to Redux. Supports Create, Read, Update, Delete with pagination.

Calendar

Month view. Click any date to add Event (blue) or Reminder (green). Multiple entries per day; edit & delete supported.

Reusable UI

Buttons, dialogs, dropdown menus, header, theme‑toggle, etc., designed for easy reuse.

🔐 Dummy Credentials

Email   : user@example.com
Password: test123

Use these to explore the app without setting up a backend.

🛠 Tech Stack

Next.js 13 (App Router)

React 18 + TypeScript

Redux Toolkit & redux‑persist

Tailwind CSS (with PostCSS) ✧

Lucide‑react for icons

ESLint + Prettier configuration included

🗂 Project Structure

src/
│
├── app/                    # App‑router folders (each = route)
│   ├── appealTable/        # ➜ /appealTable
│   │   ├── columns.tsx
│   │   ├── page.tsx
│   │   └── Pagination.tsx
│   │
│   ├── calender/           # ➜ /calender
│   │   ├── Calender.tsx
│   │   └── page.tsx
│   │
│   ├── dashboard/          # ➜ /dashboard
│   │   ├── Dashboard.tsx
│   │   └── page.tsx
│   │
│   ├── settings/           # ➜ /settings
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   └── login/              # ➜ /login
│       ├── LoginPage.tsx
│       └── page.tsx
│
├── components/             # Global reusable components
│   ├── auth/               # Login form, etc.
│   │   └── login‑form.tsx
│   ├── layout/             # Shell UI: header + sidebar
│   │   ├── Header.tsx
│   │   └── SideBar.tsx
│   └── ui/                 # Buttons, dialogs, DataTable, etc.
│       ├── Button.tsx
│       ├── dialog/
│       ├── dropdown‑menu.tsx
│       ├── DataTable.tsx
│       ├── page‑header.tsx
│       └── ThemeToggel.tsx
│
├── redux/                  # Redux Toolkit logic
│   ├── slices/
│   │   ├── appealTableSlice.ts
│   │   ├── authSlice.ts
│   │   ├── calenderSlice.ts
│   │   └── tableSlice.ts
│   ├── store.ts            # Configure store & persist
│   └── hook.ts             # Typed hooks (useAppDispatch, useAppSelector)
│
├── globals.css             # Global styles
└── providers.tsx           # App‑wide context providers (Redux, Theme, etc.)

🚀 Getting Started

# 1. Clone the repo
$ git clone https://github.com/your‑org/appeals‑web‑application.git
$ cd appeals‑web‑application

# 2. Install dependencies
$ npm install   # or pnpm install / yarn

# 3. Run in dev mode
$ npm run dev

# 4. Open http://localhost:3000 in your browser

Tip: The first authenticated route after login is /dashboard.

📄 Available Scripts

Script

Description

npm run dev

Start Next.js dev server (hot reload)

npm run build

Production build

npm start

Start the built app

npm run lint

Lint & fix code with ESLint

npm run format

Format codebase with Prettier

🖱️ Usage Guide

Login with the dummy credentials.

Navigate via the sidebar; collapse/expand as needed.

Appeal Table

Add: click the + New button.

Edit/Delete: use the inline action icons.

Calendar

Click any date ➜ choose Add Event or Add Reminder.

Entries show under the date (blue = event, green = reminder).

Click an entry to edit or delete.

Data survives page reloads thanks to redux‑persist.

📸 Screenshots (optional)

Add GIFs or screenshots here to showcase the sidebar, table CRUD, and calendar interactions.

🛡️ License

This project is licensed under the MIT License — see the LICENSE file for details.

🙋 Contributing

Fork the repo & create a feature branch.

Commit your changes.

Push the branch & open a pull request.

PRs are welcome! For major changes, please open an issue first to discuss what you would like to change.

Built with ❤️ by Rushikesh Patil