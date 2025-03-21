const {loeMatkadeAndmed, lisaOsaleja, lisaSonum, loeSonumid, lisaMatk} = require("../data")

const naitaMatkad = async (req, res) => {
    const matkad = await loeMatkadeAndmed()
    console.log(matkad)
    res.render("pages/index", {matkad: matkad})
}

const naitaKontakt = (req, res) => {
    res.render("pages/kontakt")
}

const registreeriOsaleja = async (req, res) => {
    await lisaOsaleja(req.query.matk, req.query.email)
    res.redirect("/matkad")
}

const naitaMatka = async (req, res) => {
    const matkad = await loeMatkadeAndmed()
    const matkaIndeks = req.params.id
    const matk = matkad[matkaIndeks]
    res.render('pages/matk', {matk: matk, matkaIndeks: matkaIndeks})
}

const tootleSonum = (req, res) => {
    console.log(req.body)
    lisaSonum({nimi: req.body.nimi, sonum: req.body.markus})
    console.log(loeSonumid())
    res.send(`
        <h2>Sõnum on edukalt edastatud</h2>
    `)
}

module.exports = {
    naitaMatkad,
    registreeriOsaleja,
    naitaMatka,
    naitaKontakt,
    tootleSonum,
}