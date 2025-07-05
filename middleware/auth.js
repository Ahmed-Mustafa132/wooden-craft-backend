const jwt = require('jsonwebtoken');
const User = require('../module/user');

const getToken = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    console.log(req.headers.authorization)
    return null;
};

const isAuth = async (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const isAdmin = async (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, admin only' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { isAuth, isAdmin };
