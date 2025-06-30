
# Wooden Craft Backend

This is the backend API service for the Wooden Craft e-commerce platform. It provides all necessary endpoints to manage products, users, orders, and other business logic.

## Features

- RESTful API for product management
- User authentication and authorization
- Order processing and management
- Payment integration
- Admin dashboard API
- Image upload and storage

## Technologies Used

- Node.js/Express.js (or your backend framework)
- MongoDB/PostgreSQL (or your database)
- JWT for authentication
- Multer for file uploads
- Payment gateway integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB/PostgreSQL (or your database)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd wooden-craft-backend
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wooden-craft
JWT_SECRET=your_jwt_secret
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:5000`

## API Documentation

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (Admin)
- `PUT /api/products/:id` - Update a product (Admin)
- `DELETE /api/products/:id` - Delete a product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get a specific order
- `PUT /api/orders/:id/status` - Update order status (Admin)

## Database Schema

### User
- id
- name
- email
- password
- role
- createdAt

### Product
- id
- name
- description
- price
- images
- category
- stock
- createdAt

### Order
- id
- user
- products
- totalAmount
- shippingAddress
- status
- paymentInfo
- createdAt

## Deployment

Instructions for deploying to production environments:

1. Set up environment variables for production
2. Build the application
```bash
npm run build
```
3. Start the production server
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request