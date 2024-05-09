const express = require("express");
const passport = require("passport");
const cookieSession = require("express-session");
require("dotenv").config();
require("../config/passport-setup");

const app = express();
app.set("view engine", "ejs");

app.use(
  cookieSession({
    secret: process.env.COOKIE_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

const authRoutes = require("./routes/auth-routes");
app.use("/auth", authRoutes);

const dashboardRoutes = require("./routes/dashboard-routes");
app.use("/dashboard", dashboardRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
