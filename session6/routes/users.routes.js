const router = require("express").Router();
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("../controllers/users.controllers");
const verifyAuth = require("../middlewares/verifyAuth.middleware");
const { userSearchValidator } = require("../middlewares/validator.middleware");

router.get("/", verifyAuth, getUsers);
router.get("/search", verifyAuth, userSearchValidator, searchUsers);
router.get("/:uuid", getUserById);

module.exports = router;
