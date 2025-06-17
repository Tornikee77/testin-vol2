# Law Firm Backend

A robust backend API for a law firm management system built with Node.js, Express, and TypeScript.

## 🚀 Features

- RESTful API architecture
- TypeScript for type safety
- MongoDB database integration with Mongoose
- JWT-based authentication
- Input validation using Zod
- API documentation with Swagger
- CORS enabled
- Cookie-based session management
- Password hashing with bcrypt

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd lawFirm-Back
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Running Tests

```bash
npm test
```

## 📁 Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middlewares/    # Custom middlewares
├── models/         # Database models
├── routes/         # API routes
├── tests/          # Test files
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── validators/     # Input validation schemas
├── index.ts        # Application entry point
└── server.ts       # Server configuration
```

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Validation:** Zod
- **Documentation:** Swagger
- **Testing:** Jest
- **Code Quality:** ESLint, Prettier

## 📚 API Documentation

Once the server is running, you can access the API documentation at:

```
http://localhost:3000/api-docs
```

## 🔒 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- CORS protection
- Input validation
- Secure cookie handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.
