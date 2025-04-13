const mongoose = require('mongoose');

const orderschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    } ,
    city: {
            type: String,
            required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},
{ timestamps: true });

module.exports = mongoose.model('Order', orderschema);