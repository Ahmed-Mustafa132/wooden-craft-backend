const jwt = require('jsonwebtoken');
const User = require('../module/user');
const isAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
    if (!token) {
        return res.status(401).json({ message: 'please login' });
    }
        const decoded = await jwt.verify(token, 'secret');
        
    try {
        
        if (!decoded) {
            return res.status(401).json({ message: 'please login' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'please login' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'please login' });
    }
    
    next();
}
const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'please login' });
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findById(decoded.id);

        if (!user || user.role !== 'admin') {  
            return res.status(403).json({ message: `you don't have access to do this action` });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'please login' });
    }
    
}

module.exports = {isAdmin, isAuth};