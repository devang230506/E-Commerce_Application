# 🛍️ E-Commerce Application (MERN Stack)

A modern, full-stack E-Commerce application built with the **MERN** stack (MongoDB, Express.js, React, Node.js). Features secure JWT authentication, state-driven navigation, product catalog management, and full CRUD operations styled with Tailwind CSS.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Environment Variables](#-environment-variables)
- [Screens & Navigation Flow](#-screens--navigation-flow)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login:** Password hashing with `bcryptjs` and token generation using `jsonwebtoken`.
- **JWT Authorization Middleware:** Protects backend endpoints against unauthorized access.
- **Protected Frontend Routes:** Private client-side routes (`/product`, `/add-product`, `/edit-product/:id`) with automatic redirection for unauthenticated sessions.
- **Centralized Auth State:** React Context (`AuthContext`) manages persistent sessions across page reloads via `localStorage`.
- **Conditional Navigation:** Navbar dynamically renders links based on auth state (`Home`, `Login`, `Register` for guests; `Home`, `Product`, `Logout` for logged-in users).

### 📦 Product Management (CRUD)
- **Product Catalog (`/product`):** Responsive grid displaying inventory with loading skeletons and empty states.
- **Create Product (`/add-product`):** Form with client and server-side validation for name, description, and price.
- **Update Product (`/edit-product/:id`):** Prefills existing product details and handles partial/full document updates.
- **Delete Product:** Interactive confirmation and instant optimistic UI removal.

### 🎨 UI & Design
- Built with **Tailwind CSS v4** for clean, responsive, modern aesthetics.
- Loading states, animated skeletons, and dismissible feedback alerts.

---

## 🛠️ Tech Stack

### Frontend
- **Library:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vite.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **HTTP Client:** [Axios](https://axios-http.com/) (configured with automated JWT request interceptor)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (ESM & CommonJS compatible)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM
- **Authentication:** `jsonwebtoken` (JWT) & `bcryptjs`
- **Utilities:** `dotenv`, `cors`, `nodemon`

---

## 📐 Project Architecture

```
┌────────────────────────────────┐         ┌─────────────────────────────────┐
│     React 19 Frontend (Vite)   │  HTTP   │       Express.js Backend        │
│                                │ ──────> │                                 │
│  • React Router (Routes)       │  Axios  │  • CORS & Body Parsers          │
│  • AuthContext (JWT Storage)   │ <────── │  • authMiddleware (JWT Verify)  │
│  • Tailwind CSS Components     │  JSON   │  • Controllers (Auth & Product) │
└────────────────────────────────┘         └───────────────┬─────────────────┘
                                                           │ Mongoose ODM
                                                           ▼
                                            ┌─────────────────────────────────┐
                                            │        MongoDB Database         │
                                            │                                 │
                                            │  • users collection             │
                                            │  • products collection          │
                                            └─────────────────────────────────┘
```

---

## 📂 Project Structure

```
E-Commerce_Application/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   ├── authController.js     # User registration and login logic
│   │   └── productController.js  # Product CRUD handlers
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── models/
│   │   ├── User.js               # User schema (username, email, password)
│   │   └── productModel.js       # Product schema (name, description, price)
│   ├── routes/
│   │   ├── authRoutes.js         # /register, /login routes
│   │   └── productRoutes.js      # /products routes
│   ├── .env                      # Environment configuration (ignored in git)
│   ├── .env.example              # Template for environment variables
│   ├── package.json
│   └── server.js                 # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Responsive navigation bar
│   │   │   ├── productCard.jsx   # Product card component
│   │   │   └── ProtectedRoute.jsx# Auth route guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication state management
│   │   ├── pages/
│   │   │   ├── AddProduct.jsx    # Add product page
│   │   │   ├── EditProduct.jsx   # Edit product page
│   │   │   ├── Home.jsx          # Welcome landing page
│   │   │   ├── Login.jsx         # User login form
│   │   │   ├── Product.jsx       # Product catalog list
│   │   │   └── Register.jsx      # Registration form
│   │   ├── services/
│   │   │   └── api.js            # Axios client with JWT interceptor
│   │   ├── App.jsx               # Route registrations
│   │   ├── main.jsx              # App root mount with AuthProvider
│   │   └── index.css             # Tailwind CSS imports
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 📡 API Endpoints

### Authentication (`/`)
| Method | Endpoint | Description | Protected |
|---|---|---|:---:|
| `POST` | `/register` | Register a new user | No |
| `POST` | `/login` | Authenticate user & return JWT token | No |

### Products (`/`)
| Method | Endpoint | Description | Protected |
|---|---|---|:---:|
| `GET` | `/products` | Fetch all products | Yes |
| `GET` | `/products/:id` | Fetch product by ID | Yes |
| `POST` | `/products` | Create a new product | Yes |
| `PUT` | `/products/:id` | Update an existing product | Yes |
| `DELETE` | `/products/:id` | Delete a product | Yes |

*Note: Protected endpoints require the header `Authorization: Bearer <token>`.*

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local instance running on `localhost:27017` or a MongoDB Atlas URI)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### 1. Backend Setup

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration file from the template:
   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` values (see [Environment Variables](#-environment-variables)).

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server runs by default on `http://localhost:8000`.*

---

### 2. Frontend Setup

1. In a new terminal tab, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will be accessible at `http://localhost:5173`.*

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` folder based on `backend/.env.example`:

```env
# MongoDB Connection URL
MONGOURL=mongodb://127.0.0.1:27017/E-Commerce_Application

# Server Port
PORT=8000

# Secret Key for Signing JWT Tokens
JWT_Secret_Key=your_jwt_secret_key_here
```

---

## 🧭 Screens & Navigation Flow

| Route | Access | Component | Description |
|---|---|---|---|
| `/` | Public | `Home` | Landing page welcoming users |
| `/login` | Public | `Login` | User authentication form with client validation |
| `/register` | Public | `Register` | User account creation form with password confirmation |
| `/product` | **Protected** | `Product` | Product grid listing with direct Edit and Delete controls |
| `/add-product` | **Protected** | `AddProduct` | Form to create a new product inventory item |
| `/edit-product/:id` | **Protected** | `EditProduct` | Form prefilled with product data to apply changes |

---

## 📄 License

This project is open-source and available under the [ISC License](backend/package.json).
