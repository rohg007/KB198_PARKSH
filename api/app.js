var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('config');
var authSignInRouter = require('./routes/authSignIn');
var messageSend = require('./routes/messageSend');
var SignUpRouter = require('./routes/authSignUp');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var livestockRouter = require('./routes/livestockRouter');
var healthCenterRouter = require('./routes/healthCenterRouter');
var vaccineRouter = require('./routes/vaccineRouter');
var animalOwnerRouter = require('./routes/animalOwnerRouter');
var animalRouter = require('./routes/animalRouter');
var animalCaseRouter = require('./routes/animalCaseRouter');
var diseaseRouter = require('./routes/diseaseRouter');
var humanCaseRouter = require('./routes/humanCaseRouter');
var outbreakRouter = require('./routes/outbreakRouter');
var cors = require('cors');

const app = express();
app.use(cors());

const url = config.get('mongoUrl');
try {
  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('connected')
  );
} catch (error) {
  console.log('could not connect' + error);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/livestocks', livestockRouter);
app.use('/healthCenters', healthCenterRouter);
app.use('/vaccines', vaccineRouter);
app.use('/animalOwners', animalOwnerRouter);
app.use('/auth', authSignInRouter);
app.use('/signup', SignUpRouter);
app.use('/animals', animalRouter);
app.use('/api', messageSend);
app.use('/animalCases', animalCaseRouter);
app.use('/diseases', diseaseRouter);
app.use('/humanCases', humanCaseRouter);
app.use('/outbreaks', outbreakRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
