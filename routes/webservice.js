module.exports = function (app) {
    const https = require('https');
    //var Resultat = require("../models/result.js");

   

    app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        next();
      });

    // GET-anrop en kurs
    app.get("/timeedit/api/all/courses", function (req, res) {
        const courseId = req.params.courseId;
        let courses = [];
        for (let courseindex = 132867; courseindex < 132872; courseindex++) {

            let url = "https://cloud.timeedit.net/ltu/web/schedule1/ri.json?h=t&sid=3&p=20200901.x,20210117.x&objects=" + courseindex + ".28&ox=0&types=0&fe=0";

            https.get(url, (result) => {
                let body = "";

                result.on("data", (chunk) => {
                    body += chunk;
                });

                let course = courseindex;

                result.on("end", () => {
                    try {
                        let json = JSON.parse(body);
                        course = json.reservations[0].columns[5];
                        console.log(course);
                        courses.push(course);

                    } catch (error) {
                        console.error(error.message);
                    };
                });

            }).on("error", (error) => {
                console.error(error.message);
            });
            //console.log(courseindex);
            if(courseindex==132871){
                res.status(200).send(courses);
            }
          });
        })
        .on("error", (error) => {
          console.error(error.message);
        });
      //console.log(courseindex);
      if (courseindex == 132871) {
        res.status(200).send(courses);
      }
    }
  });

  // GET-anrop alla aktiva moduler
  app.get("/timeedit/api/course/:courseId", function (req, res) {
    const courseId = req.params.courseId;
    let url =
      "https://cloud.timeedit.net/ltu/web/schedule1/ri.json?h=t&sid=3&p=20200901.x,20210117.x&objects=" +
      courseId +
      ".28&ox=0&types=0&fe=0";

    https
      .get(url, (result) => {
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
          }
        });
      })
      .on("error", (error) => {
        console.error(error.message);
      });
  });
};
