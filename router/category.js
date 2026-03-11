const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../controller/category");
const { Router } = require("express");
const router = Router();
router.post("/", createCategory);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategory);
module.exports = router;
