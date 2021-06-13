// creating http server
// express for http server
const express = require("express");
// dotenv is for to safe your secrets
const dotenv = require("dotenv");

// morgan modules allow to log a request
const morgan = require("morgan");

const connectDB = require("./server/database/connection");

const path = require("path");
const app = express();

// for useing the PORT variable from config.env file
dotenv.config({ path: "config.env" });

// .env use to keep your secret hide from the others'
const PORT = process.env.PORT || 8080;
// ------------------------------General not related to project ---------------------------
// log request
app.use(morgan("tiny"));
// app.use(morgan("combined"));
// app.use(morgan("common"));
// app.use(morgan("dev"));
// app.use(morgan("short"));

// some token is also present
// predefine token
// token is nothing but a function
// app.use(morgan(":method"));
// app.use(morgan(":date"));
// app.use(morgan(":status :url   "));
// app.use(morgan(":http-version"));

// ----------------------end-----------------------

// --------Mongodb connection--------

connectDB();

// parse request to body parser
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// app.set("view", path.resolve(__dirname,"views/ejs"))

// load assets
// express.static is a middleware
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
// if i can add ☝️ so to use css write only
// css/style.css <= add css 👈 not need to add directory name

// app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
// app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// -------------------------------------------------------------------start --------------------------------
// ------kuch gyann ke baate
// // difference between path.resolve() vs path.join()
// console.log("path.join:", path.join());
// console.log("path.resolve:", path.resolve());
// console.log("path.join:", path.join("/a", "/b"));
// console.log("path.resolve:", path.resolve("/a", "/b"));

// path.join('/a', '/b', '/c');   //   \a\b\c
// path.join('/a', '/b', 'c');    //   \a\b\c
// path.join('/a', 'b', 'c');     //   \a\b\c
// path.join('a', 'b', 'c');      //   \a\b\c
// https://stackoverflow.com/questions/35048686/whats-the-difference-between-path-resolve-and-path-join

// path.resolve creates the absolute path.
//  An absolute path always contains the root element and the complete directory list required to locate the file.
// console.log(path.resolve("/a", "b", "c")); //    F:\a\b\c
// console.log(path.resolve("/a", "/b", "c")); //    F:\b\c
// console.log(path.resolve("/a", "/b", "/c")); //    F:\c
// console.log(path.resolve("a", "b", "c")); //    F:\{current_working_directory}\a\b\c

// ------------------------------------end------------------------------------

//load router which i create in new folder

app.use("/", require("./server/routes/router"));

app.listen(PORT, () =>
  console.log(` crud app listening on port http://localhost:${PORT}`)
);
