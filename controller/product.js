const Product = require("../module/product");
const Category = require("../module/category");
const {
  uploudImgage,
  deleteImage,
  getImage,
  updateImage,
} = require("../middleware/cloudinary");

const getAllProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    let productQuery = Product.find(query).populate("category");

    if (sort === "price_asc") {
      productQuery = productQuery.sort({ price: 1 });
    } else if (sort === "price_desc") {
      productQuery = productQuery.sort({ price: -1 });
    } else {
      productQuery = productQuery.sort({ createdAt: -1 });
    }

    const products = await productQuery;

    res.status(200).json({ totalProduct: products.length, products: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("category");
    if (!product) throw new Error("Product not found");
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const editeProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image, category } = req.body;
  try {
    let product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    let imageUrl = product.image;

    if (req.file) {
      const cloudinaryResult = await updateImage(req.file, product.imgid);
      if (!cloudinaryResult.secure_url) {
        return res.status(400).json({ error: "Image upload failed" });
      }
      imageUrl = cloudinaryResult.secure_url;
    }

    // If category is being updated, verify it exists
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists)
        return res.status(400).json({ error: "Invalid category ID" });
    }

    product = await Product.findByIdAndUpdate(
      id,
      { title, description, price, image: imageUrl, category },
      { new: true },
    ).populate("category");

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Product ID is required");
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    try {
      const deleteResult = await deleteImage(product.imgid);
    } catch (error) {
      res
        .status(400)
        .json({ massage: "error on delete img", error: error.message });
    }
    const ProductDelete = await Product.findByIdAndDelete(id);
    res.status(200).json({ massage: "product deleted successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const { title, description, price, category, stockQuantity, delivery } =
      req.body;

    // Validate category
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category ID selected" });
    }

    console.log("Received product data:", req.body);
    const cloudinaryResult = await uploudImgage(req.file);
    console.log(cloudinaryResult);
    if (!cloudinaryResult.secure_url) {
      return res.status(400).json({ error: "Image upload failed" });
    }
    const product = await Product.create({
      title,
      description,
      price,
      category,
      stockQuantity,
      delivery,
      image: cloudinaryResult.secure_url,
      imgid: cloudinaryResult.public_id,
    });

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details:
        "Check if all required fields are provided and image upload is successful",
    });
    console.log(error);
  }
};
const updateProductRating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    const newRatingCount = product.ratingCount + 1;
    const newRating =
      (product.rating * product.ratingCount + rating) / newRatingCount;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        rating: Number(newRating.toFixed(1)),
        ratingCount: newRatingCount,
      },
      { new: true },
    );

    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  getById,
  editeProduct,
  deleteProduct,
  createProduct,
  updateProductRating,
};
