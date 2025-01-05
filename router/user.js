const { Router } = require('express');
const router = Router();
const {getAllUsers,getById,editeUser,deleteUser,login, register} = require('../controller/user')
router.get("/", getAllUsers);
router.get("/:id", getById);
router.put("/:id", editeUser);
router.delete("/:id", deleteUser);
router.post("/login", login);
router.post("/register", register);


module.exports = router;