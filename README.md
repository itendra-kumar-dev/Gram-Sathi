# GramSathi

**Agricultural equipment rental, made more accessible.**

GramSathi is a full-stack marketplace that helps farmers find and rent agricultural equipment from local owners. Owners can publish and manage listings; renters can discover equipment, request bookings, and keep track of their activity.

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-5FA04E?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## What you can do

- **Browse equipment:** search listings and explore equipment details, availability, pricing, and reviews.
- **Manage listings:** owners can create, edit, publish, and update equipment availability.
- **Request rentals:** renters can submit booking requests and follow their booking activity.
- **Process payments:** create Razorpay orders and verify payment signatures on the backend.
- **Stay up to date:** save listings to a persistent wishlist and receive booking and wishlist notifications.
- **Get recommendations:** ask the agricultural equipment assistant for recommendations.
- **Manage an account:** register, sign in, and update profile information.

## Built with

| Area | Technologies |
| --- | --- |
| Frontend | React, Vite, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express |
| Data | MongoDB, Mongoose |
| Media | Cloudinary |
| Payments | Razorpay |
| Recommendations | Google Generative AI |

## Getting started

### Prerequisites

- Node.js `20.19+` or `22.12+`
- npm
- MongoDB, locally or through MongoDB Atlas
- Cloudinary credentials for image uploads
- Razorpay test credentials to exercise checkout
- A Gemini API key to use AI recommendations

### 1. Configure the backend

```bash
cd gramsathi-backend
npm ci
cp .env.example .env
```

Set the values in `gramsathi-backend/.env`:

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend port; defaults to `8000`. |
| `MONGO_URI` | MongoDB connection string. |
| `JWT_SECRET` | Private secret used to sign authentication tokens. |
| `FRONTEND_URL` | Allowed frontend origin; multiple origins can be comma-separated. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret. |
| `RAZORPAY_KEY_ID` | Razorpay key ID (use test credentials during development). |
| `RAZORPAY_KEY_SECRET` | Razorpay secret (use test credentials during development). |
| `GEMINI_API_KEY` | Optional; required for AI recommendations. |

Start the API:

```bash
npm run dev
```

The API listens on port `8000` by default. Its health endpoint is `http://localhost:8000/api/health`.

### 2. Configure the frontend

In another terminal:

```bash
cd gramsathi-frontend
npm ci
cp .env.example .env
npm run dev
```

The local frontend is available at `http://localhost:5173`. Set `VITE_API_URL` to the backend API base URL, including `/api` (for example, `http://localhost:8000/api`).

### 3. Load demo listings

With MongoDB running and backend dependencies installed, seed sample equipment and local demo accounts:

```bash
cd gramsathi-backend
npm run seed
```

For a **local demo database only**:

| Role | Email | Password |
| --- | --- | --- |
| Renter | `demo.renter@gramsathi.com` | `demo1234` |
| Owner | `demo@gramsathi.com` | `demo1234` |

Sign in as the renter to request equipment, then use the owner account to review requests. **Do not use these demo credentials in a deployed environment.**

## Project layout

```text
.
├── gramsathi-backend/
│   ├── config/          # Database and Cloudinary setup
│   ├── controllers/     # API request handlers
│   ├── middleware/      # Authentication, roles, and uploads
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express API routes
│   └── services/        # External service integrations
└── gramsathi-frontend/
    └── src/
        ├── components/  # Shared and feature UI
        ├── context/     # Shared application state
        ├── pages/       # Route-level screens
        └── services/    # API clients
```

## Quality checks

Run the frontend lint and production build from `gramsathi-frontend`:

```bash
npm run lint
npm run build
```

Check backend JavaScript syntax from the repository root:

```bash
find gramsathi-backend -path '*/node_modules' -prune -o -name '*.js' -type f -print0 \
  | xargs -0 -n 1 node --check
```

The repository does not currently define a backend test script. A complete live workflow also requires correctly configured MongoDB and third-party service credentials.

## Deployment notes

- Deploy `gramsathi-backend` as a Node.js service and `gramsathi-frontend` as a static Vite site.
- Use a managed MongoDB deployment and production provider credentials stored as platform secrets.
- Set backend `FRONTEND_URL` to the deployed frontend origin and frontend `VITE_API_URL` to the deployed API URL ending in `/api`.
- Use HTTPS and configure the frontend host to fall back to `index.html` for client-side routes.
- Keep secrets out of source control; `.env` files are ignored by Git.

## Project status

This repository is an active portfolio project. No open-source license has been selected yet, so all rights remain with the author. Ask before reusing or distributing the code.

## Contributing

Bug reports, thoughtful feature suggestions, and pull requests are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the contribution workflow.
