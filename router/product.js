const { Router } = require('express');
const router = Router();
const upload = require('../middleware/multer.js');
const {isAdmin,isAuth} = require('../middleware/auth.js');

const { getAllProducts, getById, editeProduct, deleteProduct, createProduct, updateProductRating } = require('../controller/product')
router.get("/", getAllProducts);
router.get("/:id", getById);
router.put("/:id",isAdmin,upload.single('image'), editeProduct);
router.delete("/:id",isAdmin, deleteProduct);
router.post('/',isAdmin, upload.single('image'), createProduct);
router.patch("/:id/rating",isAuth, updateProductRating);

module.exports = router;
