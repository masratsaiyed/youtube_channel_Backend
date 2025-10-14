// Import mongoose library and Schema class from mongoose
import mongoose, { Schema } from "mongoose";

// Import the pagination plugin for aggregate queries
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Define a new Mongoose schema for Video collection
const videoSchema = new Schema({
    // Video file URL (e.g., uploaded to Cloudinary)
    videoFile: {
        type: String, // The URL will be stored as a string
        required: true // Mandatory field
    },

    // Thumbnail image URL
    thumbnail: {
        type: String, // Cloudinary or any image URL
        required: true // Mandatory field
    },

    // Title of the video
    title: {
        type: String,
        required: true // Mandatory field
    },

    // Description of the video
    description: {
        type: String,
        required: true // Mandatory field
    },

    // Duration of the video in seconds or minutes
    duration: {
        type: Number,
        default: 0 // Default duration value
    },

    // View count of the video
    view: {
        type: Number,
        default: 0 // Default is 0 views
    },

    // Whether the video is published or private
    isPublished: {
        type: Boolean,
        default: true // Default: video is visible
    },

    // Reference to the User model (video owner)
    owner: {
        type: mongoose.Types.ObjectId, // MongoDB Object ID
        ref: 'User' // Refers to the 'User' collection (user.model.js)
    }

}, {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
});

// Add plugin for aggregate pagination (used for advanced queries with pagination)
videoSchema.plugin(mongooseAggregatePaginate);

// Export the model so it can be used in other files
export const Video = mongoose.model("Video", videoSchema);

// 'Video' will be the name of the collection in MongoDB