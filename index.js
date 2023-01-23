const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/keys");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(MONGOURI);

mongoose.connection.on("connected", () => {
  console.log("Connection Success");
});
mongoose.connection.on("error", (err) => {
  console.log("Connection Error", err);
});

require("./models/user");
require("./models/note");

app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`iNotebook server side listening on port ${PORT}`);
});
