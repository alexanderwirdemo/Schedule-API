module.exports = function(app) {
    app.post("/login", function(req, res) {
        let email = req.body.email
        let password = req.body.password

        console.log(email, password)
        if (email == 'correct@example.com' && password == 'password') {
            console.log('Logged in!')
                // TODO: Store information and log in
            res.status(200).send();
        } else {
            console.log('Wrong information!')
            res.status(403).send()
        }
    });

    app.post("/logout", function(req, res) {
        console.log('Logged out in backend')
        res.status(200).send(json);
    });
}