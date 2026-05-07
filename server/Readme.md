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
* `{ author: -1, isFeatured: -1, createdAt: -1 }`
* `{ author: -1, engagementRate: -1 }`
* `{ tags: 1 }`

### Follow
* `{ follower: 1, following: 1 }` (Unique)

### CollectionItem
* `{ collections: 1, post: 1 }` (Unique)
* Individual indexes on `collections` and `post`

### Comment
* `{ post: 1, parent: 1, createdAt: -1 }`
* Individual indexes on `post` and `parent`

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

## 🔐 Auth (`/api/v1/auth`)

```
POST   /login                    # User login
POST   /register                 # User registration
POST   /logout                   # User logout (Protected)
POST   /refresh-access-token     # Refresh JWT
GET    /me                       # Get current user (Protected)
```

---

## 👤 User (`/api/v1/user`)

```
PATCH  /upload-avatar            # Upload profile picture
PATCH  /update-fullName          # Update display name
PATCH  /update-email             # Update email address
PATCH  /update-password          # Update account password
PATCH  /update-bio               # Update profile bio
PATCH  /update-socials           # Update social links
PATCH  /update-username          # Update username
POST   /:id/follow               # Toggle follow/unfollow
GET    /profile/:username        # Get public user profile
GET    /:id                      # Get follower/following counts
GET    /:id/followers            # List followers
GET    /:id/following            # List following
```

---

## 🖼️ Post (`/api/v1/post`)

```
POST   /create                   # Create new post (max 5 images)
POST   /feature/:id              # Toggle post featured status
GET    /single/:id               # Get single post details
GET    /all/:username            # Get all posts by user
PATCH  /edit-image/:id           # Edit post images
PATCH  /edit-caption/:id         # Edit post caption
PATCH  /edit-tag/:id             # Edit post tags
DELETE /delete/:id               # Delete post
```

---

## ❤️ Engagement (`/api/v1`)

```
POST   /posts/like/:id           # Toggle like on post
POST   /posts/save/:id           # Toggle save on post
POST   /posts/view/:id           # Increment post view count
```

---

## 💬 Comments (`/api/v1`)

```
POST   /posts/comment/:id              # Add comment to post
POST   /posts/like-comment/:id         # Toggle like on comment
POST   /posts/reply-to-comment/:id/:pId # Reply to a comment
GET    /posts/get-comments/:id         # Get all comments for a post
GET    /posts/get-comment-replies/:id  # Get replies for a comment
PATCH  /posts/edit-comment/:id         # Edit comment content
DELETE /posts/remove-comment/:idC/:idP # Remove comment
```

---

## 📁 Collections (`/api/v1/collection`)

```
POST   /create/:name             # Create new collection
GET    /all                      # List user collections
DELETE /delete/:name             # Delete collection by name
PATCH  /update-name/:id          # Update collection name
POST   /item/save                # Save post to collection
GET    /item/all/:name           # Get all items in collection
PATCH  /item/update-note/:id     # Update personal note on item
DELETE /item/remove/:id          # Remove item from collection
```

---

## 🔍 Discovery (`/api/v1/discover`)

```
GET    /posts?tag=...            # Filter posts by tag
GET    /users?userName=...              # Search users by username
```

---

## 📊 Analytics (`/api/v1/analytics`)

```
GET    /user                     # Get overall user analytics
GET    /post/:id                 # Get specific post analytics
GET    /topPosts                 # Get user's top performing posts
GET    /growth                   # Get follower growth stats
```

---

## 🧑‍💻 Portfolio (`/api/v1/portfolio`)

```
GET    /:username                # Get public portfolio data
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
