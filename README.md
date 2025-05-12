# Appeals Web Application

A fully functional web application built with **Next.js** and **TypeScript**, using **Redux Toolkit** and **redux-persist** for state management. The UI is developed by converting **Figma designs to code** with reusable components and clean architecture.

---

## 🚀 Features

- ✅ Figma to Code conversion  
- ✅ Sidebar with collapsible menu options (icons + labels)  
- ✅ Data Table with full **CRUD operations**  
- ✅ Calendar with:  
  - Add **Events** & **Reminders**  
  - View by **month**  
  - **Multiple entries per day**  
  - Color-coded display for easy distinction  
  - Edit/Delete existing items  
- ✅ Redux Toolkit with `redux-persist` for state persistence  
- ✅ Protected routes (authentication required)  
- ✅ Dummy credentials for testing  
- ✅ Reusable and modular components  

---

## 📁 Project Structure

src/
├── app/
│   ├── appealTable/
│   │   ├── columns.tsx
│   │   ├── Pagination.tsx
│   │   └── page.tsx
│   ├── calender/
│   │   ├── Calender.tsx
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── Dashboard.tsx
│   │   └── page.tsx
│   ├── settings/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── login/
│   │   ├── LoginPage.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── providers.tsx
│   └── page.tsx
│
├── components/
│   ├── auth/
│   │   └── login-form.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── SideBar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── dialog/
│       ├── dropdown-menu.tsx
│       ├── Logo.tsx
│       ├── DataTable.tsx
│       ├── page-header.tsx
│       └── ThemeToggle.tsx
│
├── redux/
│   ├── slices/
│   │   ├── appealTableSlice.ts
│   │   ├── authSlice.ts
│   │   ├── calenderSlice.ts
│   │   └── tableSlice.ts
│   ├── store.ts
│   └── hook.ts


---

## 🔐 Authentication

All application routes are **protected**. Users **must log in** to access the internal pages.

### Dummy Credentials

 Username: 'admin@example.com',
password: 'password123',


---

## 📅 Calendar Module

- Click a date to:
  - ➕ Add an Event  
  - 🔔 Add a Reminder  
- Distinct **colors** for events and reminders  
- **Multiple** entries per date supported  
- Edit & Delete operations available  

---

## 📦 Tech Stack

- **Next.js** (App Router)  
- **TypeScript**  
- **Redux Toolkit** + `redux-persist`  
- **ShadCN UI** or custom reusable components  
- **CSS Modules / TailwindCSS**  
- **React Icons**

---

## ✅ Development Notes

- Follows best practices for state separation and modular architecture  
- Emphasizes reusable UI and logic  
- Code is scalable and maintainable  

---

## 📄 License

This project is licensed for development and learning purposes.

---
