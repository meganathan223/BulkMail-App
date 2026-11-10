## BulkMail – MERN Stack Application

A full-stack bulk email application built using the MERN stack. Users can upload Excel files containing recipient email addresses, compose email messages, send bulk emails, and track campaign history.

### Features

- Upload Excel files (`.xlsx`, `.xls`) to import recipient emails.
- Extract and validate email addresses.
- Remove duplicate recipients.
- Compose email subject and message.
- Send emails individually using Nodemailer and Gmail SMTP.
- Track successful and failed email deliveries.
- Store email campaign history in MongoDB.
- View previous email campaigns.
- Responsive dashboard UI.

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React
- SheetJS (`xlsx`)

### Backend

- Node.js
- Express.js
- Nodemailer
- Mongoose
- dotenv
- CORS

### Database

- MongoDB Atlas

## Installation and Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd BulkMail-app
```

### 2. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

### 3. Backend setup

Open another terminal:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
CLIENT_URL=http://localhost:5173

MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password

MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint              | Description                        |
| ------ | --------------------- | ---------------------------------- |
| POST   | `/api/emails/send`    | Send bulk emails and save campaign |
| GET    | `/api/emails/history` | Retrieve email campaign history    |

## Database Structure

**Database:** `bulkmail`

**Collection:** `emails`

## Future Improvements

- Admin authentication using JWT and bcrypt.
- Campaign search and status
