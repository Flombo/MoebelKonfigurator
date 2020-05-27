const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended : true});
const dotenv = require('dotenv').config();
const mysql= require('mysql');
const session = require('express-session');
const mySQLStore = require('express-mysql-session')(session);
const mySQLStoreOptions ={
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE
};
const sessionStore = new mySQLStore(mySQLStoreOptions);
const passport = require('passport');
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(express.json({limit: "1mb"}));
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   store: sessionStore,
   saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

function getConnection(){
   return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
   });
}

app.post('/login', urlencodedParser, async (req, res) => {
   let email = req.body.email;
   let passwd = req.body.password;
   let query = "SELECT * FROM user WHERE email='" + email + "';";
   let conn = getConnection();
   await conn.query(query, (err, rows) => {
      if(err || rows.length === 0){
         conn.rollback();
         conn.end();
         res.render('authentification', {msg: "<p class='error'>Login failed! please check the email<p>"});
      } else {
         checkPassword(res, passwd, rows, req);
         conn.end();
      }
   });
});

async function checkPassword(res, passwd, rows, req){
   const validPasswd = await bcrypt.compare(passwd, rows[0].password);
   if(!validPasswd){
      res.render('authentification', {msg: "<p class='error'>Login failed! Please check the password</p>"});
   } else {
      const userId = rows[0].id;
      passport.authenticate(userId, req, () => {
         res.redirect('/');
      });
   }
}

app.post('/register', urlencodedParser, async (req, res) => {
   let username = req.body.username;
   let passwd = req.body.password;
   let email = req.body.email;
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(passwd, salt);
   let query = "INSERT INTO user(name, email, password) values('"
       + username + "','" + email + "','" + hashedPassword +"');";
   let selectQuery = "SELECT * FROM user WHERE email='" + email + "';";
   let conn = getConnection();
   conn.query(selectQuery, (err, rows) => {
      if(err !== null){
         sendError(conn, res);
      } else {
         checkUserValues(query, conn, rows, res);
         conn.end();
      }
   });
});

function checkUserValues(query, conn, rows, res){
   if(rows === undefined || rows === null || rows.length === 0){
      conn.query(query, (err) => {
         checkRegistry(err, res, conn);
      });
   } else {
      sendError(conn, res);
   }
}

function checkRegistry(err, res, conn){
   if(err){
      sendError(conn, res);
   } else {
      res.render('authentification', {msg: "<p class='success'>Registry successful</p>"});
   }
}

function sendError(conn, res){
   conn.rollback();
   res.render('authentification', {msg: "<p class='error'>Registry failed! The entered email is already in use!</p>"});
}

app.get('/logout', (req, res) => {
   req.logout();
   req.session.destroy();
   res.redirect('/');
});

app.get('/', (req, res) => {
   if(req.session.passport !== undefined && req.session.passport.user !== undefined) {
      res.render('index');
   } else {
      res.render('authentification', {msg : ""});
   }
});

app.listen(3000);