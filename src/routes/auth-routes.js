const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
  }
  req.redirect("/");
});

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: [
      "email",
      "pages_show_list",
      // "pages_manage_metadata",
      // "pages_messaging",
    ],
  })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    if (req.user) {
      res.redirect("/dashboard");
    } else {
      res.redirect("/");
    }
  }
);

module.exports = router;
