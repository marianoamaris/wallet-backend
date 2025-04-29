# Wallet Backend API

A secure and scalable REST API for managing cryptocurrency wallets, built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- 🔐 Secure user authentication with JWT
- 💼 Multi-chain wallet management (Bitcoin, Ethereum, Polygon, BSC)
- ✨ TypeScript for type safety
- 🛡️ Input validation with Zod
- 📝 Comprehensive API documentation
- 🔄 TypeORM for database management
- 🚦 Rate limiting for API endpoints
- 📊 Logging with Winston

## Prerequisites

- Node.js >= 14
- PostgreSQL >= 12
- npm or yarn

## ⚠️ Important: Database Setup (Required)

Before starting the application, you MUST create the database:

```bash
# Connect to PostgreSQL
psql postgres

# Create the database (copy and paste this command)
CREATE DATABASE wallet_db;

# To verify the database was created
\l

# Exit psql
\q
```

Alternatively, if you prefer one command:

```bash
createdb wallet_db
```

Then configure your database connection in `.env`:

```env
# If you have username/password:
DATABASE_URL=postgresql://username:password@localhost:5432/wallet_db

# If you're on Mac and haven't set up a password:
DATABASE_URL=postgresql://localhost:5432/wallet_db
```

> ⚠️ **Note**: The application will not start if the database doesn't exist!

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/marianoamaris/wallet-backend>
cd wallet-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgresql://localhost:5432/wallet_db  # Update this according to your setup
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
```

## Database Setup

1. Install PostgreSQL if you haven't already:

   ```bash
   # macOS using Homebrew
   brew install postgresql@14
   brew services start postgresql@14

   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   ```

2. Create the database:

   ```bash
   createdb wallet_db

   ```

3. Update your `.env` file with the correct database credentials:

   ```env
   DATABASE_URL=postgresql://wallet_user:your_password@localhost:5432/wallet_db
   ```

4. Run database migrations:

   ```bash
   # Generate migration from entities
   npm run typeorm:generate-migration

   # Apply migrations
   npm run typeorm:run-migrations
   ```

5. Verify database setup:

   ```bash
   # Connect to the database
   psql wallet_db

   # List tables
   \dt

   # You should see tables for users, wallets, and migrations
   ```

## Starting the Server

1. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/signout` - Sign out user

### Wallets

- `GET /api/wallets` - Get all wallets for authenticated user
- `GET /api/wallets/:id` - Get specific wallet by ID
- `POST /api/wallets` - Create a new wallet
- `PUT /api/wallets/:id` - Update wallet details
- `DELETE /api/wallets/:id` - Delete a wallet

## Request/Response Examples

### Create Wallet

```json
// POST /api/wallets
// Request
{
  "tag": "My ETH Wallet",
  "chain": "Ethereum",
  "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
}

// Response
{
  "success": true,
  "message": "Wallet created successfully",
  "data": {
    "id": "uuid",
    "tag": "My ETH Wallet",
    "chain": "Ethereum",
    "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "userId": "user-uuid"
  }
}
```

## Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "message": "Error message here",
  "error": {
    "code": 404,
    "details": "Additional error details if any"
  }
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production

### Project Structure

```
src/
├── config/         # Configuration files
├── entities/       # TypeORM entities
├── middleware/     # Express middlewares
├── routes/         # API routes
├── schemas/        # Zod validation schemas
├── services/       # Business logic
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- Secure password storage
- No sensitive data exposure in responses

## Postman Setup and Testing Guide

### 1. Environment Setup in Postman

1. Create a new environment called "Wallet API Local"
2. Add these variables:
   ```
   base_url: http://localhost:3000/api
   token: [leave empty initially]
   ```

### 2. Collection Setup

Import or create a new collection with these folders:

#### Auth Endpoints

1. **Register User (POST)**

   ```
   URL: {{base_url}}/auth/register
   Headers: Content-Type: application/json
   Body (raw JSON):
   {
     "email": "test@example.com",
     "password": "123456"
   }
   Expected Response: 201 Created
   ```

2. **Login (POST)**

   ```
   URL: {{base_url}}/auth/login
   Headers: Content-Type: application/json
   Body (raw JSON):
   {
     "email": "test@example.com",
     "password": "123456"
   }
   Expected Response: 200 OK
   ```

   Add this Test script to automatically save the token:

   ```javascript
   if (pm.response.code === 200) {
     var jsonData = pm.response.json();
     pm.environment.set("token", jsonData.data.token);
   }
   ```

3. **Sign Out (POST)**
   ```
   URL: {{base_url}}/auth/signout
   Headers:
   - Content-Type: application/json
   - Authorization: Bearer {{token}}
   Expected Response: 200 OK
   ```

#### Wallet Endpoints

1. **Create Wallet (POST)**

   ```
   URL: {{base_url}}/wallets
   Headers:
   - Content-Type: application/json
   - Authorization: Bearer {{token}}
   Body (raw JSON):
   {
     "tag": "My ETH Wallet",
     "chain": "Ethereum",
     "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
   }
   Expected Response: 201 Created
   ```

2. **Get All Wallets (GET)**

   ```
   URL: {{base_url}}/wallets
   Headers: Authorization: Bearer {{token}}
   Expected Response: 200 OK
   ```

3. **Get Wallet by ID (GET)**

   ```
   URL: {{base_url}}/wallets/:id
   Headers: Authorization: Bearer {{token}}
   Expected Response: 200 OK
   ```

4. **Update Wallet (PUT)**

   ```
   URL: {{base_url}}/wallets/:id
   Headers:
   - Content-Type: application/json
   - Authorization: Bearer {{token}}
   Body (raw JSON):
   {
     "tag": "Updated ETH Wallet"
   }
   Expected Response: 200 OK
   ```

5. **Delete Wallet (DELETE)**
   ```
   URL: {{base_url}}/wallets/:id
   Headers: Authorization: Bearer {{token}}
   Expected Response: 200 OK
   ```

### 3. Testing Flow

1. Start the server locally (`npm run dev`)
2. Test the authentication flow:
   - Register a new user
   - Login with the user (token will be automatically saved)
   - Verify token is saved in environment
3. Test wallet operations:
   - Create a new wallet
   - List all wallets
   - Get specific wallet
   - Update wallet
   - Delete wallet
4. Test error cases:
   - Try to create duplicate wallet
   - Try to access with invalid token
   - Try to access non-existent wallet

### 4. Common Issues and Solutions

1. **404 Not Found**

   - Verify the server is running
   - Check if base_url is correctly set
   - Ensure you're using the correct endpoint paths

2. **401 Unauthorized**

   - Check if token is present in environment
   - Verify token hasn't expired
   - Make sure you're logged in

3. **400 Bad Request**
   - Verify JSON body format
   - Check required fields are present
   - Ensure wallet address format is correct
