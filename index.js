var express = require('express');
var app = express();

app.get("/random/:min/:max", function(req, res) {
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);

    if (isNaN(min) || isNaN(max) || min > max) {
        res.status(400);
        res.json({ error: "Invalid parameters" });
        return;
    }

    var result = Math.round(Math.random()* (max - min) + min);
    res.json({ random: result });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});