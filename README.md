# Mahoroba Japanese Bakery

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_7-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=react&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white)

A full-stack e-commerce and bakery ordering platform modeled after authentic Japanese bakery operations. The application solves digital ordering workflows for artisanal bakeries by providing real-time menu management, synchronized customer profiles, interactive shopping carts, simulated payment processing with Stripe, and an administrative order management system.

---

## Tech Stack

| Domain             | Technology            | Version   | Purpose                                                      |
| :----------------- | :-------------------- | :-------- | :----------------------------------------------------------- |
| **Framework**      | Next.js (App Router)  | `16.1.6`  | Server-rendered React framework & API routes                 |
| **UI Library**     | React                 | `19.2.3`  | Component architecture                                       |
| **Language**       | TypeScript            | `5.x`     | Static typing and type safety                                |
| **Styling**        | Tailwind CSS          | `4.x`     | Utility-first CSS framework                                  |
| **Animations**     | Motion                | `12.38.0` | UI transitions and modal animations                          |
| **ORM**            | Prisma                | `7.5.0`   | Type-safe database client and migrations                     |
| **Database**       | PostgreSQL            | `16+`     | Relational database (Local via Docker / Hosted via Supabase) |
| **Authentication** | NextAuth.js (Auth.js) | `4.24.13` | OAuth 2.0 session handling via Google Provider               |
| **Payments**       | Stripe API & Elements | `22.0.1`  | PaymentIntent processing in Test Mode                        |
| **Media Hosting**  | Cloudinary            | API v1.1  | Cloud image storage for pastry assets                        |
| **Client State**   | Zustand               | `5.0.12`  | LocalStorage-persisted shopping cart state                   |
| **Server State**   | TanStack React Query  | `5.96.2`  | Data fetching, caching, and cache invalidation               |

---

## Prerequisites

- **Node.js**: `v20.0.0` or higher
- **npm**: `v10.0.0` or higher
- **Docker & Docker Compose**: For local PostgreSQL container
- **Google Cloud Console Account**: For Google OAuth 2.0 Client ID and Secret
- **Stripe Account**: For Stripe Test Mode API keys

---

## Environment Variables

Create a `.env` file in the root directory with the following configuration:

```env
# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/postgres?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret_key"

# Google OAuth 2.0
GOOGLE_ID="your_google_client_id.apps.googleusercontent.com"
GOOGLE_SECRET="your_google_client_secret"

# Stripe Test Mode
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="twjr22of"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="bakery_preset"
```

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mahoroba-japanese-bakery-website.git
cd mahoroba-japanese-bakery-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Database

```bash
docker compose up -d
```

### 4. Push Schema & Seed Initial Data

```bash
# Push Prisma schema to the database
npx prisma db push

# Seed 37 Japanese pastries and standard categories
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## System Architecture

```mermaid
flowchart TD
    Client["Client Browser (React 19 / Next.js)"]
    Auth["NextAuth.js (Google OAuth)"]
    APIRoutes["Next.js Route Handlers (/api/*)"]
    Prisma["Prisma ORM (@prisma/adapter-pg)"]
    DB[(PostgreSQL Database)]
    StripeAPI["Stripe Payments API"]
    CloudinaryAPI["Cloudinary CDN"]

    Client -->|User Session / Auth| Auth
    Client -->|HTTP Requests| APIRoutes
    Client -->|Card Tokenization| StripeAPI
    Client -->|Direct Image Upload| CloudinaryAPI

    APIRoutes -->|Type-Safe Queries| Prisma
    Prisma -->|TCP Connection Pool| DB
    APIRoutes -->|Create PaymentIntent| StripeAPI
```

### Order Lifecycle Flow

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant Cart as Zustand Store
    participant Checkout as /pay/[id]
    participant API as /api/orders & /api/create-intent
    participant Stripe as Stripe API
    participant DB as PostgreSQL (Prisma)

    Customer->>Cart: Add Pastries to Cart
    Customer->>API: POST /api/orders (status: 'Not Paid!')
    API->>DB: Insert Order Record
    API-->>Customer: Return orderId
    Customer->>Checkout: Navigate to /pay/[orderId]
    Checkout->>API: POST /api/create-intent/[orderId]
    API->>Stripe: Create PaymentIntent
    API->>DB: Update order with intent_id
    API-->>Checkout: Return clientSecret
    Customer->>Stripe: Submit Payment via Stripe Elements
    Stripe-->>Customer: Return status: 'succeeded'
    Customer->>API: PUT /api/confirm/[intentId] (status: 'Preparing')
    API->>DB: Update Order status to 'Preparing'
    Customer->>Cart: clearCart()
    Customer->>Customer: Navigate to /orders (Order History)
```

---

## Data Models

```mermaid
erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    User ||--o{ Order : places
    Category ||--o{ Product : contains

    User {
        String id PK
        String name
        String firstName
        String lastName
        String phone
        String email UK
        DateTime emailVerified
        String image
        Boolean isAdmin
    }

    Category {
        String id PK
        DateTime createAt
        String title
        String img
        String slug UK
    }

    Product {
        String id PK
        DateTime createAt
        String title
        String desc
        String img
        Decimal price
        String catSlug FK
    }

    Order {
        String id PK
        DateTime createAt
        Decimal price
        Json products
        String status
        String intent_id UK
        String userEmail
        String firstName
        String lastName
        String phone
        String pickupTime
        Decimal subtotal
        Decimal tax
        Decimal tip
        Decimal fee
    }
```

---

## API Documentation

### Products (`/api/products`)

| Method   | Endpoint                   | Auth Required | Description                                                                              |
| :------- | :------------------------- | :------------ | :--------------------------------------------------------------------------------------- |
| `GET`    | `/api/products?cat=[slug]` | No            | Retrieves product list, optionally filtered by category. Sorted alphabetically by title. |
| `POST`   | `/api/products`            | Yes (Admin)   | Creates a new pastry entry with Cloudinary asset URL.                                    |
| `DELETE` | `/api/products/[id]`       | Yes (Admin)   | Deletes a product by ID.                                                                 |

### Categories (`/api/categories`)

| Method | Endpoint          | Auth Required | Description                                                                                   |
| :----- | :---------------- | :------------ | :-------------------------------------------------------------------------------------------- |
| `GET`  | `/api/categories` | No            | Retrieves all bakery categories (`sweet`, `savory`, `pies-and-danishes`, `loaves-and-rolls`). |

### Profile (`/api/profile`)

| Method | Endpoint       | Auth Required | Description                                                                         |
| :----- | :------------- | :------------ | :---------------------------------------------------------------------------------- |
| `GET`  | `/api/profile` | Yes           | Retrieves current user profile details (`firstName`, `lastName`, `phone`, `email`). |
| `PUT`  | `/api/profile` | Yes           | Updates profile contact fields used for checkout pre-population.                    |

### Orders (`/api/orders`)

| Method | Endpoint      | Auth Required | Description                                                                                |
| :----- | :------------ | :------------ | :----------------------------------------------------------------------------------------- |
| `GET`  | `/api/orders` | Yes           | Retrieves confirmed orders. Customers receive their own orders; Admins receive all orders. |
| `POST` | `/api/orders` | Yes           | Creates an initial checkout order record with status `Not Paid!`.                          |
| `PUT`  | `/api/orders` | Yes           | Updates order metadata (customer contact details, pickup time, tip, tax, fees, status).    |

### Checkout & Payment Confirmation

| Method | Endpoint                       | Auth Required | Description                                                                   |
| :----- | :----------------------------- | :------------ | :---------------------------------------------------------------------------- |
| `POST` | `/api/create-intent/[orderId]` | Yes           | Creates a Stripe PaymentIntent for the specified order price.                 |
| `PUT`  | `/api/confirm/[intentId]`      | Yes           | Updates order status from `Not Paid!` to `Preparing` upon payment completion. |

---

## Scripts

| Command              | Description                                           |
| :------------------- | :---------------------------------------------------- |
| `npm run dev`        | Runs the Next.js development server                   |
| `npm run build`      | Generates Prisma client and compiles production build |
| `npm run start`      | Starts the production server                          |
| `npm run lint`       | Runs ESLint analysis                                  |
| `npm run format`     | Runs Prettier code formatting                         |
| `npx prisma db push` | Syncs schema directly with target PostgreSQL database |
| `npx prisma db seed` | Executes `prisma/seed.ts` to populate catalog data    |
| `npx prisma studio`  | Launches browser GUI for visual database management   |
