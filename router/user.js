const { Router } = require('express');
const router = Router();
const {isAdmin,isAuth} = require('../middleware/auth.js');
const { getAllUsers, getById, editeUser, deleteUser, login, register } = require('../controller/user')

router.get("/",isAdmin, getAllUsers);
router.get("/:id",isAuth, getById);
router.put("/:id",isAuth, editeUser);
router.delete("/:id",isAuth, deleteUser);
router.post("/login", login);
router.post("/register", register);


module.exports = router;