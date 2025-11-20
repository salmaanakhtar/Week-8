var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("get request to the homepage");
});

app.post("/", function (req, res) {
  res.send("post request to the homepage");
});

app.put("/", function (req, res) {
  res.send("put request to the homepage");
});

app.delete("/", function (req, res) {
  res.send("delete request to the homepage");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
    