module.exports = function(app) {

    app.post("/login", function(req, res) {
        let db = req.app.locals.db // Database connection stored in app
        let email = req.body.email // Email that was entered
        let password = req.body.password // Password that was entered

        // Query database for user and password
        db.collection('Schedule-Frontend').find({ "E-mail": email, "Password": password }).toArray().then((results) => {
            results.forEach((result) => {
                if (result['E-mail'] === email && result['Password'] === password) {
                    // TODO: Actually log in user
                    res.status(200).send();
                    return;
                }
            })
            res.status(403).send();
        });
    });

    app.post("/logout", function(req, res) {
        console.log('Logged out in backend');
        // TODO: Actually log out user
        res.status(200).send(json);
    });
}