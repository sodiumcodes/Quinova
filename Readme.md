# YouTube Backend Clone
[![Node.js](https://img.shields.io/badge/Node.js-v20-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green.svg)](https://mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

A scalable **Node.js/Express/MongoDB backend** for a YouTube-like video sharing platform. Features secure JWT auth (access/refresh tokens), user profiles with ImageKit media uploads, channel subscriptions, watch history, and video management foundations.

## Features
- **Authentication**: Register/Login/Logout/Refresh Tokens (JWT, bcrypt, httpOnly cookies)
- **User Profiles**: Avatar/Cover uploads (ImageKit), update name/email/password, channel profiles (`/channel/:username`)
- **Analytics**: Subscriber counts, subscription status, watch history (MongoDB aggregates)
- **Media**: Multer + ImageKit (upload/delete, 5MB limit)
- **Security**: Async error handling, ApiError/ApiResponse utils, CORS, rate-ready
- **Pagination**: mongoose-aggregate-paginate-v2 for scalable queries

## Project Structure
```
server/
├── app.js              # Express app setup (CORS, middleware)
├── server.js           # Entry point (DB connect, PORT listener)
├── configs/            # DB & ImageKit
│   ├── db.js
│   └── imagekit.config.js
├── controllers/        # Business logic
│   ├── auth.controller.js
│   └── user.controller.js
├── middlewares/        # Auth & upload
│   ├── auth.middleware.js (verifyUser)
│   └── upload.middleware.js (multer)
├── models/             # Mongoose schemas
│   ├── user.model.js   # (avatar, watchHistory, tokens)
│   ├── video.model.js  # (views, isPublished)
│   └── subscription.model.js
├── routes/             # API routes
│   ├── auth.route.js   # /api/v1/auth/*
│   └── user.route.js   # /api/v1/user/*
├── services/           # External APIs
│   └── imagekit.service.js
└── utils/              # Helpers (JWT, errors, asyncHandler)
    ├── ApiError.js
    ├── ApiResponse.js
    └── jwt.js
```

## 🚀 Quick Start
1. Clone & Install:
   ```bash
   git clone <repo> && cd server
   npm install
   ```

2. Environment Variables (`.env`):
   ```
   MONGO_URI=mongodb://localhost:27017/youtube_backend
   PORT=8080
   CORS_ORIGIN=http://localhost:3000  # Frontend URL

   # JWT (use strong secrets!)
   ACCESS_TOKEN_SECRET=your-access-secret
   REFRESH_TOKEN_SECRET=your-refresh-secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=7d

   # ImageKit
   IMAGEKIT_PUBLIC_KEY=your-public
   IMAGEKIT_PRIVATE_KEY=your-private
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-endpoint
   ```

3. Run:
   ```bash
   npm run dev  # nodemon server.js
   # or npm start
   ```
   Server: `http://localhost:8080`

## API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | - | Create account |
| POST | `/api/v1/auth/login` | - | Login (returns tokens) |
| POST | `/api/v1/auth/logout` | ✅ | Clear tokens |
| POST | `/api/v1/auth/refresh-access-token` | - | New access token |
| GET | `/api/v1/auth/me` | ✅ | Current user |
| PATCH | `/api/v1/user/upload-avatar` | ✅ | Upload avatar (multipart) |
| PATCH | `/api/v1/user/upload-coverImage` | ✅ | Upload cover |
| PATCH | `/api/v1/user/update-fullName` | ✅ | Update name |
| PATCH | `/api/v1/user/update-email` | ✅ | Update email |
| PATCH | `/api/v1/user/update-password` | ✅ | Update password |
| GET | `/api/v1/user/channel/:username` | ✅ | Channel profile + subs |
| GET | `/api/v1/user/watch-history` | ✅ | Watch history |

**Auth**: `Authorization: Bearer <token>` or `Cookie: accessToken=...`

## Architecture
- **DB**: MongoDB (`youtube_backend`), Mongoose ODM
- **Auth Flow**: Login → access/refresh cookies → verifyUser middleware → req.user
- **Images**: Multer (RAM buffer) → ImageKit CDN (auto-delete old on update)
- **Tokens**: Access (short, stateless), Refresh (DB-stored, rotated)
- **Aggregations**: For channel stats/watch history (efficient $lookup/$size)

## Security
- Passwords: bcrypt (pre-save hook)
- Tokens: JWT verify, refresh rotation, httpOnly/secure cookies
- Errors: Centralized ApiError, no stack leaks
- Validation: Trim/lowercase, unique indexes

## Todos / Future
- Video upload/publish/search/views routes
- Subscription CRUD
- Comments/Likes/Playlists
- Video streaming (HLS?), compression
- Rate limiting (express-rate-limit)
- Tests (Jest/Supertest)
- Docker/PM2 deployment

## Contributing
1. Fork & PR
2. Follow ESLint/Prettier
3. Add tests

## License
ISC