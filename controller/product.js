const Product = require('../module/product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({totalProduct: products.length,products :products});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) throw new Error('Product not found');
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const editeProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, image, category } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, { title, description, price, image, category }, { new: true });
        if (!product) throw new Error('Product not found');
        res.status(200).json({ product });
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteProduct = async(req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) throw new Error('Product not found');
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const createProduct = async (req, res) => {
    const { title, description, price, image, category } = req.body;
    try {
        const product = await Product.create({ title, description, price, image, category });
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = { getAllProducts, getById, editeProduct, deleteProduct, createProduct };
