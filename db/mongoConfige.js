const mongoose = require('mongoose');
const dbConnection = () => {
    return mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('MongoDB connection error:', err));
};

module.exports = dbConnection;