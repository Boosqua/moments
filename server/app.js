var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Users = require('./app/controllers/users');
const Session = require('./app/controllers/session')
const Albums = require('./app/controllers/albums')
const Images = require('./app/controllers/images')
const upload = require("./app/controllers/image_upload_aws")
const path = require("path");
var app = express();
const passport = require("passport");
const port = 8080;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'html');
app.use(passport.initialize());
require("./config/passport")(passport);
app.listen(process.env.PORT || 8080);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join('app', 'client', "build")));
   app.get("/", function (req, res) {
   res.sendFile(path.resolve('app', 'client', "build", "index.html"));
   });
}
app.get('/', (req, res) => {
  res.send(`${new Date()}`);
});
app.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username
    });
  }
);

app.get('/api/users', Users.index);
app.get('/api/albums', Albums.index);
app.get('/api/recentimages', Images.getRecentImages);
app.get('/api/users/:id', Users.getUserById)
app.patch('/api/users/:id', Users.updateUser)
app.delete('/api/users/:id', Users.deleteUser)
app.post('/api/images',upload.array("albums[photos][]", 200), Images.upload)
app.patch('/api/albums/cover', upload.array("albums[photos][]", 200), Images.uploadCover)
app.delete('/api/albums/:id', Albums.delete)
app.post('/api/users', Users.createUser)
app.post('/api/albums', Albums.createAlbum)
app.post('/api/users/login', Session.loginUser)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
module.exports = app;
