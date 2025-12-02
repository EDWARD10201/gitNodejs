const express = require("express");
const app = express();
const mysql = require("mysql2");
const post = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded())

//mysql接続
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "practice_1"
});
db.connect((err) => {
    if (err) {
        console.error("mysql接続失敗", err);
        return;
    } else {
        console.log("mysql接続成功");
    }
});








app.get("/", (req, res) => {
    const sql = "SELECT * FROM users ORDER BY id DESC";
    db.query(sql, (err, result) => {
        if(err) {
            console.error("データ取得失敗", err);
            return;
        } else {
            res.render("index", {users: result});
        }
    })
})


app.post("/posts", (req, res) => {
    const {name} = req.body;
    const sql = "INSERT INTO users (name) VALUES (?)";
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error("データ挿入失敗", err);
            return;
        } else {
            res.redirect("/");
        }
    })
})


app.get("/pokemon/:start/:end", async (req, res) => {
    const {start, end} = req.params;
    let pokemons= [];

    for( let i = Number(start); i < Number(end); i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await response.json();
        pokemons.push({
            id: data.id,
            name: data.name,
            image: data.sprites.front_default
        });
    }

            res.render("pokemon", { pokemons });

    

});

//サーバー起動
app.listen(post, () => {
    console.log(`サーバーが起動しました:${post}`);
})






