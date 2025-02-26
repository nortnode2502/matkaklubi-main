const express = require('express')

const path = require("path")

const {naitaMatkad, naitaMatka, registreeriOsaleja } =require("./controller")

const app = express();
app.use(express.static("public"))
const PORT = process.env.PORT || 3030

//app.use(express.json())
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/test", (req, res) => {
    res.send(`
        <h1>test test</h1>
    `)
})

app.get('/', naitaMatkad)

app.get('/matk/:id', naitaMatka)

app.listen(PORT, () => console.log('Mataklubi töötab pordil ' + PORT))