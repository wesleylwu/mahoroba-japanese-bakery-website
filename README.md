# Mahoroba Japanese Bakery

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=react&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white)

A full-stack ordering and showcase platform inspired by Mahoroba Japanese Bakery.

---

## Features

- **Responsive UI:** Mobile-first design tailored for all screen sizes.
- **Dynamic Menu:** Product categories and individual product detail pages.
- **State Management:** Client-side cart management using Zustand.
- **Containerized Database:** Local development environment powered by Docker.
- **Authentication:** Secure user login and session management via Google (Auth.js/NextAuth).
- **Payment Processing:** Integrated Stripe checkout flow.
- **Admin Dashboard:** Protected routes for order tracking and status updates.

---

## Tech Stack

| Domain             | Technology                                        |
| :----------------- | :------------------------------------------------ |
| **Frontend**       | React 19, Next.js 16 (App Router), Tailwind CSS 4 |
| **Backend**        | Next.js API Routes, NextAuth.js                   |
| **Database**       | PostgreSQL, Prisma ORM                            |
| **Infrastructure** | Docker, Docker Compose                            |
| **Payments**       | Stripe                                            |
| **State & Data**   | Zustand, React Query                              |

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker Desktop

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the infrastructure:
   ```bash
   docker compose up -d
   ```
4. Sync the database:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
