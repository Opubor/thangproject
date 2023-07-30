var createError = require('http-errors');
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var authRouter = require('./routes/auth');
var testEnvironmentRouter = require('./routes/testEnvironment');
var folderRouter = require('./routes/folder');
var testCaseTableRouter = require('./routes/testCaseTable');
var testCaseRouter = require('./routes/testCase');
var testExecutionRouter = require('./routes/testExecution');
var forgotPasswordRouter = require('./routes/forgotPassword');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Management API",
      version: "1.0.0",
      description: "A management software API"
    },
    servers: [
      {url: "http://localhost:3000"}
    ],
  },
  apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(swaggerOptions)

app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(specs))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "x-auth-token"],
}
app.use(cors(corsOptions))
app.use(cors())

app.use('/', indexRouter);
app.use('/', adminRouter);
app.use('/', authRouter);
app.use('/', testEnvironmentRouter);
app.use('/', folderRouter);
app.use('/', testCaseTableRouter);
app.use('/', testCaseRouter);
app.use('/', testExecutionRouter);
app.use('/', forgotPasswordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
