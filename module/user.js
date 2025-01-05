const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function (v) {
                return /[a-z]/.test(v) && /[A-Z]/.test(v) && /[0-9]/.test(v);
            },
            message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

module.exports = mongoose.model("User", userSchema);