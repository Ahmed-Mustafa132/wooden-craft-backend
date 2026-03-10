const { cloudinary } = require("../db/cloudinaryCongfige");

// uploud image  to  cloudinary
const uploudImgage = async (file) => {
    try {
        console.log("Uploading image to Cloudinary:");
        if (!file) throw new Error("No file provided");
        console.log("File details:")
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "woodenCraft",
            use_filename: true,
        });
        console.log("Image uploaded to Cloudinary:", result);
        return result;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error("Image upload failed: " + error.message);
    }
};
const deleteImage = async (publicId) => {
    try {
        if (!publicId) throw new Error("No public ID provided");
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        throw new Error("Image deletion failed: " + error.message);
    }
}
const getImage = async (publicId) => {
    try {
        if (!publicId) throw new Error("No public ID provided");
        const result = await cloudinary.api.resource(publicId);
        return result;
    } catch (error) {
        console.error("Error retrieving image from Cloudinary:", error);
        throw new Error("Image retrieval failed: " + error.message);
    }
}
const updateImage = async (file, publicId) => {
    try {
        if (!file) throw new Error("No file provided");
        if (!publicId) throw new Error("No public ID provided");
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "woodenCraft",
            use_filename: true, public_id: publicId,
        });
        return result;
    } catch (error) {
        console.error("Error updating image in Cloudinary:", error);
        throw new Error("Image update failed: " + error.message);
    }
}
module.exports = {
    uploudImgage,
    deleteImage,
    getImage,
    updateImage
}