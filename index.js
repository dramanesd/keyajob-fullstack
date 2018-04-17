require("dotenv").config()
var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    cors             = require("cors")
    indexRoutes      = require("./routes"),
    authRoutes       = require("./routes/auth"),
    jobRoutes        = require("./routes/jobs"),
    requestRoutes    = require("./routes/requests")
    categoryRoutes   = require("./routes/categories"),
    jobtypeRoutes    = require("./routes/jobtypes"),
    tagRoutes        = require("./routes/tags");
    compagnyRoutes   = require("./routes/compagnies"),
    errorHandler     = require("./helpers/errors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.use('/', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/jobs', jobRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/user/:id/categories', categoryRoutes);
app.use('/api/user/:id/jobtypes', jobtypeRoutes);
app.use('/api/user/:id/tags', tagRoutes);
app.use('/api/user/:id/compagnies', compagnyRoutes);

app.listen(process.env.PORT, function() {
  console.log(`The server is runing on ${process.env.PORT}!`);
}); 