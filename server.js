const express = require("express"); // include express so we can use it -> app
const mongoose = require("mongoose"); // to connect to the db
const bodyParser = require("body-parser"); // use bodyparser to parse req.body

const store = require("./routes/api/store");
const user = require("./routes/api/user");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("Database Connected."))
  .catch(err => console.log(err));

// use routes

// route to test store, maybe we will remove it in future
app.use("/api/store", store);
app.use("/api/user", user);

const port = 5000; // use localhost:5000

app.listen(port, () => console.log("server running " + port));
