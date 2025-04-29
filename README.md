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

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
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
DATABASE_URL=postgresql://username:password@localhost:5432/wallet_db
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

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
