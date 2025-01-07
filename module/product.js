const mongoose = require('mongoose');

// Define schema first
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['furniture', 'decor', 'kitchen', 'outdoor', 'other']
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    material: {
        type: String ,
        required: true
    }
    ,
    dimensions: {
        type: String ,
        required: true
    },
    weight: {
        type: String ,
        required: true
    },
    finish: {
        type: String ,
        required: true
    },
    warranty: {
        type: Number ,
        required: true
    },
    delivery: {
        type: String ,
        required: true
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model in one step
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
