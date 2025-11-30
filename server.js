const express = require("express");
const app = express();
const mysql = require("mysql2");
const post = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "practice_1"
});

db.connect((err) => {
    if(err){
        console.error(`mysqlに接続できませんでした${err}`);
        return;
    } else {
        console.log("mysql接続成功")
    }
})



app.get("/", (req,res) => {
    res.render("index");
})


app.post("/posts", (req, res) => {
    const {name} = req.body;
    const sql = "INSERT INTO users (name) VALUES(?)";

    db.query(sql, [name], (err, result) => {
        if(err){ console.error(`データ取得失敗${err}`)}
        return;
    })

    res.redirect("/");
})


app.listen(post, () => {
    console.log("サーバー起動")
} );