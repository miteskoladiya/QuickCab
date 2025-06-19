# 🚖 QuickCab - A Simple MERN Stack Application

QuickCab is a full-stack ride-booking app built using the MERN stack (MongoDB, Express, React, Node.js). This app allows users to book rides and captains (drivers) to manage ride requests.

---

## 🛠️ Manual Docker Setup

You can run all services manually using Docker CLI.

### 🔹 Step 1: Create a Docker Network

```bash
docker network create quickcab-net
```

### 🔹 Step 2: Build and Run the Frontend

```bash
cd Frontend
docker build -t quickcab-frontend .
docker run --name=frontend --network=quickcab-net -d -p 5173:5173 quickcab-frontend
```

📍 Open in browser: [http://localhost:5173](http://localhost:5173)

### 🔹 Step 3: Run MongoDB Container

```bash
docker run --network=quickcab-net --name=mongo -d -p 27017:27017 -v ~/opt/data:/data/db mongo:latest
```

### 🔹 Step 4: Build and Run the Backend

```bash
cd ../Backend
docker build -t quickcab-backend .
docker run --name=backend --network=quickcab-net -d -p 4000:4000 quickcab-backend
```

📍 Backend runs at: [http://localhost:4000](http://localhost:4000)

### 🔹 Step 5: Stop All Running Containers (Manual)

```bash
docker stop frontend backend mongo
```

---

## 🐳 Docker Compose Setup (Recommended)

Run everything with one command.

### 🔹 Step 1: Build and Start Containers

```bash
docker compose up -d --build
```

This will:

- Build and run frontend and backend
- Start a MongoDB container
- Connect all via Docker network

### 🔹 Step 2: Stop All Services

```bash
docker compose down
```

To remove volumes too:

```bash
docker compose down -v
```