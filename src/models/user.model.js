// Importing necessary packages
import mongoose from "mongoose";     // For MongoDB modeling
import JWT from "jsonwebtoken";      // For creating tokens (login auth)
import bcrypt from "bcrypt";         // For password hashing

// Extract Schema from mongoose
const { Schema } = mongoose;

// Defining User schema (structure of user document)
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,      // userName must be provided
        unique: true,        // no two users can have same username
        lowercase: true,     // store in lowercase
        trim: true,          // remove extra spaces
        index: true          // used for faster searching
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,         // searchable field
    },

    avatar: {
        type: String,        // Cloudinary image URL
        required: true,
    },

    coverImage: {
        type: String,        // Optional Cloudinary image URL
    },

    watchHistory: [
        {
            type: mongoose.Types.ObjectId, // Store IDs of watched videos
            ref: "Video"                   // Reference to Video model
        }
    ],

    password: {
        type: String,
        required: [true, "Password is required"], // Custom message if not provided
    },

    refreshToken: {
        type: String,        // Used to store JWT refresh token
    }
}, {
    timestamps: true          // Automatically adds createdAt and updatedAt
});


// =====================  Middleware: Password Hashing =====================

// This function runs *before saving* user to the database
userSchema.pre("save", async function (next) {
    // If password is not modified, skip hashing
    if (!this.isModified('password')) return next();

    // Hash password with bcrypt (10 salt rounds)
    this.password = await bcrypt.hash(this.password, 10);

    next();
});


// ===================== 🔑 Instance Method: Check Password =====================

userSchema.methods.isPasswordCorrect = async function (password) {
    // Compare plain password with hashed password stored in DB
    return await bcrypt.compare(password, this.password);
};


// ===================== JWT Token Methods =====================

// Generate Access Token (short-lived token for authentication)
userSchema.methods.generateAccessToken = function () {
    return JWT.sign(
        {
            _id: this._id,              // User ID
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key from .env
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE // e.g. '15m' or '1h'
        }
    );
};

// Generate Refresh Token (long-lived token for renewing access)
userSchema.methods.generateRefreshToken = function () {
    return JWT.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key for refresh token
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE // e.g. '10d'
        }
    );
};


// ===================== Export Model =====================

// Create model named 'User' using userSchema
// Mongoose will store documents in the 'users' collection 
export const User = mongoose.model("User", userSchema);
