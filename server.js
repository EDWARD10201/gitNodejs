const express = require("express");
const app = express();
const mysql = require("mysql2");
const post = 3000;

app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("index");
})



app.listen(post, () => {
    console.log("サーバー起動")
} );