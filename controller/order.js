const express = require('express');
const Order = require('../module/order');
const jwt = require('jsonwebtoken');
const getAllOrders = async (req, res) => { 
    try {
        const orders = await Order.find({})
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createOrder = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        // Verify token first
        console.log(jwt.verify(token, 'secret'));
        const decoded = jwt.verify(token, 'secret');
        const userId = decoded.id;
        console.log(decoded);
        console.log(req.body);
        const {
            fullName,
            products,
            totalPrice,
            address,
            phone,
            city,
            postalCode
        } = req.body;

            console.log(products[0]);
        // Validate required fields
        if (!products || !fullName || !address || !phone || !city || !postalCode) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create order
        const order = await Order.create({
            products,
            fullName,
            totalPrice,
            address,
            phone,
            city,
            postalCode,
            userId
        });
        console.log(order);
        // Send response
        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });

        }
    }



module.exports = {
    getAllOrders,
    createOrder,
};