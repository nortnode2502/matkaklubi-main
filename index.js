const express = require('express')

const path = require("path")

const {
    naitaMatkad, 
    naitaMatka, 
    registreeriOsaleja, 
    naitaKontakt,
    tootleSonum
} = require("./controller");

const { tagastaSonumid, lisaSonum, tagastaMatkad, looMatk } = require('./api_controller');

const app = express();
app.use(express.static("public"))
const PORT = process.env.PORT || 3030

app.use(express.json())
app.use(express.urlencoded())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/test", (req, res) => {
    res.send(`
        <h1>test test</h1>
    `)
})

app.get('/', naitaMatkad)

app.get('/matk/:id', naitaMatka)

app.get('/kontakt', naitaKontakt)
app.post('/kontakt', tootleSonum)

//API endpoindid
app.get('/api/sonumid', tagastaSonumid)
app.post('/api/sonumid', lisaSonum)
app.get('/api/matkad', tagastaMatkad)
app.post('/api/matk', looMatk)

//Admin
app.get('/admin', (req, res)=>{res.render('pages/admin')})


app.listen(PORT, () => console.log('Mataklubi töötab pordil ' + PORT))