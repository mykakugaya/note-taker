var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

//Makes sure CSS loads with Notes page
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Router
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});