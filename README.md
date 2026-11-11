# BulkMail Application

A full-stack bulk email application built using the MERN stack and Brevo API. Users can compose emails, upload Excel files containing recipient email addresses, and send emails individually.

## Features

- Compose emails with subject and message.
- Upload Excel files (`.xlsx`, `.xls`) containing recipient emails.
- Validate email addresses and remove duplicates.
- Send emails using Brevo API.
- Track successful and failed sending requests.
- Store campaign history in MongoDB.
- View previous email campaigns.

## Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- SheetJS (`xlsx`)
- Lucide React

### Backend

- Node.js
- Express.js
- Brevo API (`@getbrevo/brevo`)
- MongoDB
- Mongoose
- dotenv
- CORS

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd BulkMail-App
```

### 2. Frontend setup

```bash
cd frontend
npm install
```

Create a frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

### 3. Backend setup

Open another terminal:

```bash
cd backend
npm install
```

Create a backend `.env` file:

```env
PORT=5000
CLIENT_URL=http://localhost:5173

MONGO_URI=your_mongodb_connection_string

BREVO_API_KEY=your_brevo_api_key
BREVO_FROM_EMAIL=your_verified_sender_email
```

Start backend:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | `/api/emails/send`    | Send bulk emails           |
| GET    | `/api/emails/history` | Get email campaign history |

## Important Notes

- Keep API keys and database credentials inside `.env`.
- Never upload `.env` files to GitHub.
- Configure a verified sender in Brevo.
- A successful API response means the provider accepted the request; it does not guarantee inbox delivery.
- Send emails only to recipients who have given permission.

## License

This project is created for learning and portfolio purposes.
