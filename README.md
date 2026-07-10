# Saurashtra Cabs — Full-Stack Taxi Booking Site

A full-stack booking site for an outstation taxi service covering India's
pilgrimage.

**Stack:** React (Vite) frontend · Node/Express backend (ES Modules) · MongoDB Atlas

**Repo:** https://github.com/MontuSherasiya/Texi-App

---

## 0. Clone the repo

```bash
git clone https://github.com/MontuSherasiya/Texi-App.git
cd Texi-App
```

---

## Project structure

```
taxi-app/
├── client/                    React frontend (Vite)
│   ├── .env                   VITE_API_BASE_URL (optional for local dev)
│   └── src/
│       ├── api/axios.js       centralized API client
│       ├── components/        Header, Hero, BookingForm, Fleet, Destinations, etc.
│       └── styles/index.css
└── server/                    Express backend (ES Modules)
    ├── .env                   MONGODB_URI, PORT, CLIENT_ORIGIN, ADMIN_API_KEY
    └── src/
        ├── config/db.js           MongoDB Atlas connection
        ├── models/                Booking.js, Vehicle.js, Contact.js
        ├── controllers/           route handler logic
        ├── routes/                /api/bookings, /api/vehicles, /api/contact
        ├── middleware/            error handler + admin-key auth
        ├── seed/seedVehicles.js   populates starter fleet
        └── server.js              app entry point
```

> **Note:** the backend uses ES Modules (`import`/`export`), not CommonJS.
> Every backend file uses `import ... from "..."` and `export default`.

---

## 1. Set up MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Database Access** → create a database user with a password
3. **Network Access** → allow your IP (or `0.0.0.0/0` for local testing)
4. **Connect → Drivers** → copy the connection string
5. Make sure your cluster isn't **paused** (free-tier clusters auto-pause after inactivity — click Resume if so)

---

## 2. Backend setup

```bash
cd server
npm install
```

Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/taxi_db?retryWrites=true&w=majority
CLIENT_ORIGIN=http://localhost:5173
ADMIN_API_KEY=change-this-to-a-long-random-string
```

> If your password has special characters (`@`, `#`, `%`, etc.), URL-encode them
> — e.g. `p@ss#1` becomes `p%40ss%231`.

Then:
```bash
npm run seed   # populates the vehicles collection with a starter fleet
npm run dev    # starts the API on http://localhost:5000
```

You should see, in this order:
```
Mongo Connected: cluster0-shard-00-01.xxxxx.mongodb.net
Server running on http://localhost:5000
```

---

## 3. Frontend setup

```bash
cd client
npm install
npm run dev    # starts React on http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:5000` (see
`client/vite.config.js`), so `client/.env` isn't required for local dev.
It's only needed when deploying frontend/backend to separate domains:
```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

---

## 4. API reference

| Method | Endpoint                     | Auth                  | Description                 |
|--------|-------------------------------|------------------------|-------------------------------|
| GET    | `/api/health`                 | none                    | Health check                  |
| GET    | `/api/vehicles`               | none                    | List active vehicles          |
| POST   | `/api/vehicles`               | `x-admin-key` header    | Add a vehicle                 |
| POST   | `/api/bookings`               | none                    | Submit a booking request      |
| GET    | `/api/bookings`               | `x-admin-key` header    | List all bookings (admin)     |
| PATCH  | `/api/bookings/:id/status`    | `x-admin-key` header    | Update a booking's status     |
| POST   | `/api/contact`                | none                    | Submit a contact message      |

Admin-only routes require a header:
```
x-admin-key: <ADMIN_API_KEY from .env>
```
This is a lightweight shared-secret check meant for internal use — swap in
real authentication (JWT + login page) before exposing an admin dashboard
publicly.

### Example: create a booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ravi Patel",
    "phone": "9090909090",
    "pickupDate": "2026-07-15",
    "from": "Rajkot",
    "to": "Somnath",
    "vehicle": "Swift Dzire (4 seater)"
  }'
```

### Booking status values
`new` · `contacted` · `confirmed` · `completed` · `cancelled`

---

## 5. Troubleshooting

| Symptom | Likely cause |
|---|---|
| `Operation insertOne() buffering timed out` | Mongoose never actually connected — check `mongoose.connect(uri)` is called and awaited in `config/db.js`, and that Atlas Network Access allows your IP |
| `MONGO is missing` on startup | `.env` missing, misnamed, or not in the `server/` root folder |
| `Cannot GET /api/...` | Wrong HTTP method selected in Postman, or a `:` typo instead of `/` in the URL |
| `401 Unauthorized` on admin routes | Missing/incorrect `x-admin-key` header |
| `400 All fields are required` despite filling the form | Check the browser Network tab → Payload to confirm your input `id`s match the state keys exactly |
| Date field resets after picking | Input `id`, state key, and `value={}` binding must all use the identical name |

---

## 6. Deployment notes

- **Backend** → Render, Railway, or a VPS. Set `MONGODB_URI`, `CLIENT_ORIGIN`, `ADMIN_API_KEY` as environment variables in your host's dashboard.
- **Frontend** → `npm run build` in `client/` produces a static `dist/` folder, deployable to Vercel or Netlify. Set `VITE_API_BASE_URL` to your live backend URL before building.
- Update `CLIENT_ORIGIN` in the backend once your frontend has a real domain, so CORS allows it.
- Remove the `0.0.0.0/0` Atlas Network Access rule (if you added it for testing) and replace with your production server's IP.

---

## License

Private project — not licensed for redistribution.