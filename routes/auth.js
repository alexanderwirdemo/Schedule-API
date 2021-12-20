const jwt = require('jsonwebtoken');

const TOKEN_SECRET = "ThisIsASecretString";

// Generates a simple JWT token
function generateAccessToken(email) {
  return jwt.sign(email, TOKEN_SECRET);
}

module.exports = function (app) {
  // https://www.bezkoder.com/angular-11-jwt-auth/
  app.post("/login", function (req, res) {
    let db = req.app.locals.db; // Database connection stored in app object
    let email = req.body.email; // Email that was entered
    let password = req.body.password; // Password that was entered

    // Query database for user and password and check if something matches
    db.collection("Schedule-Frontend")
      .find({ "E-mail": email, Password: password })
      .toArray()
      .then((users) => {
        users.forEach((user) => {
          // Login succeeded. Email and password matches.
          if (user["E-mail"] === email && user["Password"] === password) {
            const token = generateAccessToken(email); // Generate a JWT token to send back

            // Put token and user into the resonse to the client
            res.json({ token: token, user: user});
            res.status(200).send();
            return;
          }
        });

        // Login failed. No user matched with email and password
        res.status(403).send();
      });
  });
};
