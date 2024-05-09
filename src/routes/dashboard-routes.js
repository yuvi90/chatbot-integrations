const router = require("express").Router();
const authMiddleWare = require("../middlewares/auth");

router.get("/", authMiddleWare, (req, res) => {
  res.render("dashboard", { user: req.user });
});

module.exports = router;
