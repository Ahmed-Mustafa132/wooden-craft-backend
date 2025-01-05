const { Router } = require('express');
const router = Router();
const { getAllProducts, getById, editeProduct, deleteProduct, createProduct } = require('../controller/product')
router.get("/", getAllProducts);
router.get("/:id", getById);
router.put("/:id", editeProduct);
router.delete("/:id", deleteProduct);
router.post("/", createProduct);
module.exports = router;
