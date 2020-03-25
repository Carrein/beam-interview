const sqlite3 = require("sqlite3").verbose();
const csv = require("csv-parser");
const fs = require("fs");
const geolib = require("geolib");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 4000;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var db = new sqlite3.Database(":memory:");

db.serialize(function() {
  db.run(
    "CREATE TABLE BIKE_LOCATION (quantity INT, latitude REAL, longitude REAL)"
  );

  var stmt = db.prepare("INSERT INTO BIKE_LOCATION VALUES (?, ? ,?)");

  fs.createReadStream("assets/mrt.csv")
    .pipe(csv())
    .on("data", row => {
      stmt.run(getRandomInt(30), row.Latitude, row.Longitude);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      stmt.finalize();
    });
});

let sql = `SELECT * FROM BIKE_LOCATION`;

app.get("/location", (request, response) => {
  const args = request.query;

  console.log(args);
  getPoints(args.radius, args.latitude, args.longitude).then(data => {
    response.send(data);
  });
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});

const getPoints = (radius, latitude, longitude) => {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      const response = [];
      if (err) {
        reject(err);
      }
      rows.forEach(row => {
        //   console.log(row.quantity, row.latitude, row.longitude);
        const distance = geolib.getDistance(
          {
            latitude: Number(latitude),
            longitude: Number(longitude)
          },
          {
            latitude: row.latitude,
            longitude: row.longitude
          }
        );

        if (distance <= Number(radius)) {
          response.push(row);
        }
      });
      resolve(response);
    });
  });
};
