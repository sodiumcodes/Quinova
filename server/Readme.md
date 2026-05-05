# 🚀 Quinova — Scalable Social Backend API

![Node.js](https://img.shields.io/badge/Node.js-v20-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-ISC-yellow)

A **production-grade backend API** for a modern social/portfolio platform built with **Node.js, Express, and MongoDB**.

This project powers a **creator-focused platform** where users can:

* Share posts (images)
* Build public portfolios
* Discover content 
* Engage through likes, saves, comments, and follows
* Organize saved content into collections and add a personal/private note to each post

---

# ✨ Features

## 🔐 Authentication & Security

* JWT-based authentication (access + refresh tokens)
* bcrypt password hashing
* httpOnly cookies support
* Protected routes with middleware
* Centralized error handling (`ApiError`, `ApiResponse`)

---

## 👤 User System

* Profile management (avatar, bio, social links)
* Username-based identity
* Followers / Following system (transaction-safe)
* Counts optimization:

  * `followersCount`
  * `followingCount`
  * `postsCount`

---

## 🖼️ Post System

* Image-based posts (ImageKit integration)
* Tag-based categorization
* Engagement metrics:

  * likes
  * comments
  * saves
  * views
  * engagementRate

---

## ❤️ Engagement System

* Like / Save / View / Comment tracking
* Transaction-safe updates
* Precomputed counters for performance
* Scalable engagement model

---

## 💬 Comment System (Advanced)

* Add / edit / delete comments
* ⏱️ Edit window (30 minutes)
* 👍 Comment likes
* 🔗 Comment chaining (replies)
* `commentsCount` optimization

---

## 📁 Saved Collections 

* Default collection ("Saved")
* Custom collections
* Add/remove posts
* 📝 Personal notes per saved post
* Fully scalable (no array storage)

---

## 🔍 Discovery System

* Filter posts by tags
* Trending tags (aggregation)
* Explore feed (engagement-based ranking)

---

## 📊 Analytics System

* User analytics (followers, engagement, views)
* Post analytics (engagement rate)
* Growth tracking (aggregation pipelines)
* Top-performing posts

---

## 🧑‍💻 Portfolio API

* Public user portfolio
* Profile + stats
* Smart post preview:

  * Featured posts
  * Fallback to top engagement posts

---

## 🔎 Search System

* User search (username-based)
* Post search (tag-based)
* Combined search endpoint
* Optimized queries with indexing

---

# 🏗️ Architecture

```
server/
├── configs/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── app.js
├── server.js
```

---

## 🧠 Design Principles

* **Separation of concerns**
* **Scalable data modeling (no large arrays)**
* **Index-driven queries**
* **Minimal payload responses**
* **Transaction-safe operations**
* **Precomputed counts for performance**

---

# ⚡ Performance Optimizations

## ✅ Indexing Strategy

### Post

* `owner + createdAt`
* `owner + engagementRate`
* `tags`

### Follow

* `follower + following (unique)`

### CollectionItem

* `collection`
* `collection + post (unique)`

### Comment

* `post + createdAt`

---

## ✅ Pagination

All endpoints support:

```
?page=1&limit=10
```

* Max limit capped (anti-abuse)
* Efficient skip-based pagination

---

## ✅ Count Optimization

Instead of expensive queries:

* `followersCount`
* `likesCount`
* `commentsCount`

👉 Updated at write-time → fast reads

---

# 🔄 API Overview

## 🔐 Auth

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh-access-token
GET  /api/v1/auth/me
```

---

## 👤 User

```
GET    /api/v1/user/profile
PATCH  /api/v1/user/update-fullName
PATCH  /api/v1/user/update-email
PATCH  /api/v1/user/update-password
PATCH  /api/v1/user/update-bio
PATCH  /api/v1/user/update-social-links
```

---

## 🖼️ Posts

```
POST   /api/v1/posts
GET    /api/v1/posts
GET    /api/v1/posts/:id
DELETE /api/v1/posts/:id
```

---

## ❤️ Engagement

```
POST /api/v1/posts/:id/like
POST /api/v1/posts/:id/save
POST /api/v1/posts/:id/view
```

---

## 💬 Comments

```
POST   /api/v1/posts/:postId/comments
GET    /api/v1/posts/:postId/comments
PATCH  /api/v1/comments/:id
DELETE /api/v1/comments/:id
POST   /api/v1/comments/:id/like
GET    /api/v1/comments/:id/replies
```

---

## 📁 Collections

```
POST   /api/v1/collections
GET    /api/v1/collections
DELETE /api/v1/collections/:id
POST   /api/v1/collections/save/:postId
POST   /api/v1/collections/:id/posts/:postId
DELETE /api/v1/collections/:id/posts/:postId
PATCH  /api/v1/collections/:id/posts/:postId
GET    /api/v1/collections/:id
```

---

## 🔍 Discovery

```
GET /api/v1/posts?tag=react
GET /api/v1/posts/explore
GET /api/v1/tags/trending
```

---

## 📊 Analytics

```
GET /api/v1/analytics/user
GET /api/v1/analytics/post/:id
GET /api/v1/analytics/growth
GET /api/v1/analytics/top-posts
```

---

## 🧑‍💻 Portfolio

```
GET /api/v1/portfolio/:username
```

---

## 🔎 Search

```
GET /api/v1/search/users?q=
GET /api/v1/search/posts?q=
GET /api/v1/search?q=
```

---

# ⚙️ Setup & Installation

## 1. Clone Repo

```
git clone <repo-url>
cd server
```

## 2. Install Dependencies

```
npm install
```

## 3. Environment Variables (.env)

```
MONGO_URI=your_mongodb_uri
PORT=8080

ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

---

## 4. Run Server

```
npm run dev
```

Server runs at:

```
http://localhost:8080
```

---

# 🔒 Security

* Password hashing (bcrypt)
* JWT verification
* Refresh token rotation
* Protected routes
* Input validation
* No sensitive data leaks

---

# 🚀 Future Improvements

* Redis caching (analytics + feed)
* Precomputed analytics (cron jobs)
* Notifications system (alert when a new post is created by their favourite creator)
* Feed personalization
* Chat System

---

# 🧠 What Makes This Project Strong

* Real-world scalable architecture
* Clean separation of logic
* Production-level patterns (transactions, indexing)
* Covers **end-to-end backend design**
* Easily extendable to full social platform

---

# 📜 License

ISC

---

# 🙌 Author
Naina Dugar

Built with focus on **scalability, performance, and clean architecture**.
