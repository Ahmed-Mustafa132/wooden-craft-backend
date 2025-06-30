const User = require('../module/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const editeUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true });
        if (!user) throw new Error('User not found');
        res.status(200).json({ user });
    } catch(error) {
            res.status(400).json({ error: error.message });
        }
}
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new Error('User not found');
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid email or password ');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid email or password');
        const token = jwt.sign({ id: user._id, role: user.role  }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await User.findOne({ email }); // Await the result of findOne
        if (exists) {
            return res.status(400).json({ error: 'User already exists' }); // Return to prevent further execution
        }
        console.log("done")
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword }); // Create a new user instance
        await user.save(); // Save the user to the database
        console.log(user)
        res.status(201).json({ user }); // Send the saved user object
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getAllUsers, getById, editeUser, deleteUser, login, register };