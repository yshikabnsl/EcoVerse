# EcoVerse — Intelligent Waste Management System

A smart web UI for the EcoVerse project that helps citizens segregate waste, schedule pickups, earn rewards, and enables municipalities to optimize garbage truck routes.

## Features

- **AI Waste Classification** — Upload images to classify waste as Organic, Recyclable, or Hazardous
- **Pickup Scheduling** — Schedule waste collections and track status
- **Rewards System** — Earn points for proper segregation and redeem for eco-friendly rewards
- **Route Optimization** — View optimized routes (Dijkstra's algorithm) for municipal efficiency

## Tech Stack

- **Frontend:** React 19 + Vite
- **Routing:** React Router DOM

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   └── Layout.tsx      # App shell & navigation
├── pages/
│   ├── Dashboard.tsx   # Overview & quick actions
│   ├── WasteClassifier.tsx  # AI image classification
│   ├── PickupSchedule.tsx   # Schedule & track pickups
│   ├── Rewards.tsx     # Points & redemption
│   └── RouteOptimization.tsx # Route map view
├── App.tsx
├── main.tsx
└── index.css
```

## Backend Integration

Connect to your Node.js/Express backend and TensorFlow/Keras ML model:

- `POST /upload-image` — Waste classification
- `GET/POST /pickup` — Schedule and fetch pickups
- `GET /rewards` — User points
- `GET /get-route` — Optimized route data

---

*EcoVerse — Making waste management smarter and cities cleaner.*
