const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const prisma = require("../prisma/prisma-client");

passport.serializeUser((user, cb) => {
  cb(null, user.profile_id); // Store profile_id in session
});

passport.deserializeUser(async (profile_id, cb) => {
  try {
    const user = await prisma.users.findUnique({ where: { profile_id } });
    cb(null, user); // Passing the user object to the callback
  } catch (error) {
    cb(error); // Handle errors during deserialization
  }
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.BASE_URL}:${process.env.PORT}/auth/facebook/redirect`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await prisma.users.findUnique({
          where: { profile_id: profile.id },
        });

        if (!user) {
          const newUser = await prisma.users.create({
            data: {
              profile_id: profile.id,
              full_name: profile.displayName,
              access_token: accessToken,
              refresh_token: refreshToken,
            },
          });
          cb(null, newUser);
        } else {
          cb(null, user);
        }
      } catch (error) {
        cb(error);
      }
    }
  )
);
