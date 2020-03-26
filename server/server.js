const sqlite3 = require("sqlite3").verbose();
const csv = require("csv-parser");
const fs = require("fs");
const geolib = require("geolib");
const express = require("express");
const cors = require("cors");

const app = express();

const port = 4000;

// Setup cross site origin to allow localhost.
app.use(cors());

// Create an in memory database as have no .db file.
var db = new sqlite3.Database(":memory:");

// Generates a random bike quantity.
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Process mrt.csv file and generate a random number of bikes at each mrt location.
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

// GET request for location, perform getPoints based on request and return response with bikes within a radius.
app.get("/location", (request, response) => {
  const args = request.query;
  getPoints(args.radius, args.latitude, args.longitude).then(data => {
    response.send(data);
  });
});

// HTTP server.
app.listen(port, err => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

// SQL statement for getPoints.
const sql = `SELECT * FROM BIKE_LOCATION`;

/**
 * Given a radius, latitude and longtitude, iterate through all entries and perform haversine to determine if a bike location is contained within the given radius. If it is, add to the set and return the set as a Promise.
 *
 * @param {Number} radius - Radius in which to search for bikes.
 * @param {Number} latitude - Latitude of the current user.
 * @param {Number} longitude - Longitude of the current user.
 */
const getPoints = (radius, latitude, longitude) => {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      const response = [];
      if (err) {
        reject(err);
      }
      rows.forEach(row => {
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
