require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 8000;
const app = express();

//allow access for 3rd partywebsite.
app.use(cors());

// parse application/json
app.use(bodyParser.json());

//application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: true }));

//db connection.
(function dbConnect() {
  const db = require("./models");

  try {
    db.mongoose.set("strictQuery", false);
    db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Failed to connect a DB", err);
    process.exit(1);
  }
})();

//test connection
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to best buddy web server.",
  });
});

//user routes
require('./routes/user.routes')(app);

//property routes
require('./routes/property.routes')(app);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
