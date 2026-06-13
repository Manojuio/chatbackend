# Realtime One-to-One Chat

A simple real-time chat application built with Node.js, Express, Socket.IO, and MongoDB. It supports private one-to-one conversations with live message delivery and message history.

## Features
- Real-time one-to-one chat using Socket.IO
- Private conversation rooms based on two participant names
- Message history loaded from MongoDB
- Dark, modern UI

## Tech Stack
- Node.js
- Express
- Socket.IO
- MongoDB + Mongoose

## Prerequisites
- Node.js installed
- MongoDB running locally or a reachable MongoDB URI

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/realtime
   ```
   Replace the URI if you are using another MongoDB instance.

## Run the app
Start the server:
```bash
npm start
```

Open the app in your browser:
```text
http://127.0.0.1:3000/
```

If port 3000 is busy, start it on another port:
```powershell
$env:PORT='3100'; npm start
```
Then open:
```text
http://127.0.0.1:3100/
```

## Test from two tabs
1. Open the app in two browser tabs.
2. In Tab 1, enter:
   - Your name: Alice
   - Chat with: Bob
3. In Tab 2, enter:
   - Your name: Bob
   - Chat with: Alice
4. Click "Join chat" in both tabs.
5. Send a message from one tab and it should appear in the other tab instantly.

## Project Structure
```text
src/
  server.js
  public/
    index.html
  routes/
  controllers/
  models/
```

## Notes
- The app uses a private room name generated from the two participant names.
- History is fetched from MongoDB when you join a chat.
