
module.exports = function (app) {
    const https = require('https');
    //var Resultat = require("../models/result.js");
    let token = "3755~0H049oLoUPpNxP85OmmXJf8MiSE5R7Fv4HvFPkt8GB3634QvaksVv3XqVM9DEF2A";

    /*calendar_event[context_code]: "course_6241",
            calendar_event[title]:"API Test!",
            calendar_event[start_at]: "2018-11-16T17:00:00Z",
            calendar_event[end_at]: "2018-11-16T20:00:00Z"*/

            let url = "https://ltu.instructure.com/api/v1/calendar_events.json";
            let headers = {Authorization: "Bearer "+token};
            let calendar_event = {
                context_code: "course_6241",
                title: "API Test!",
                start_at: "2018-11-16T17:00:00Z",
                end_at: "2018-11-16T20:00:00Z"
            };
            let form = {
                calendar_event,
            };
            let method = "POST";
            //method: 'POST'

            let required = {url, headers, form};


    // POST-anrop en kurs
    app.post("/canvas/api/courses", function ({url: url, headers: headers, form: form, method: method}, res) {
        //const courseId = req.params.courseId;
       //console.dir(required);

       res.send();
       

    });

    // GET-anrop alla aktiva moduler
    app.get("/canvas/api/course/", function (req, res) {
        //const courseId = req.params.courseId;
        let url = "https://ltu.instructure.com/api/v1/courses?access_token="+token;

        https.get(url, (result) => {
            let body = "";

            result.on("data", (chunk) => {
                body += chunk;
            });

            result.on("end", () => {
                try {
                    let json = JSON.parse(body);
                    console.dir(json);
                    res.status(200).send(json);
                } catch (error) {
                    console.error(error.message);
                };
            });

        }).on("error", (error) => {
            console.error(error.message);
        });

    });

}


