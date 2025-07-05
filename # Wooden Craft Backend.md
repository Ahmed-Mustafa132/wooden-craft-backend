# Wooden Craft Backend

This is the backend API service for the Wooden Craft e-commerce platform. It provides all necessary endpoints to manage products, users, orders, and other business logic.

## Features

- RESTful API for product management
- User authentication and authorization (JWT)
- Order processing and management
- Admin dashboard API
- Image upload and storage (Multer & Cloudinary)
- Secure password hashing (bcrypt)

## Technologies Used

- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Multer for file uploads
- Cloudinary for image storage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd wooden-furniture-backend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables  
   Create a `.env` file in the root directory with the following:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/wooden-craft
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
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
- `POST /users/register` — Register a new user
- `POST /users/login` — Login a user

### Products
- `GET /products` — Get all products
- `GET /products/:id` — Get a specific product
- `POST /products` — Create a new product (Admin)
- `PUT /products/:id` — Update a product (Admin)
- `DELETE /products/:id` — Delete a product (Admin)

### Orders
- `GET /orders` — Get all orders (Admin)
- `GET /orders/user/:userId` — Get orders for a specific user
- `POST /orders` — Create a new order
- `PUT /orders/:id/status` — Update order status (Admin)

## Database Schema

### User
- id
- name
- email
- password
- role (user/admin)
- createdAt

### Product
- id
- title
- description
- price
- images
- category
- stockQuantity
- createdAt

### Order
- id
- userId
- products
- totalPrice
- address
- status
- createdAt

## Deployment

1. Set up environment variables for production
2. Build the application (if needed)
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

---

**Happy Coding!**