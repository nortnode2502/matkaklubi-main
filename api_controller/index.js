const { loeSonumid, lisaSonum : lisaSonumData, loeMatkadeAndmed } = require('../data')

const tagastaSonumid = (req, res) => {
    const sonumid = loeSonumid()
    res.json(sonumid)
}

const lisaSonum = (req, res) => {
    console.log(req.body)
    lisaSonumData({nimi: req.body.nimi, sonum: req.body.markus})
    res.status(201).end()
}

const tagastaMatkad = (req, res) => {
    const matkad = loeMatkadeAndmed()
    res.json(matkad)
}

async function looMatk(req, res) {
    if (!req.body.nimetus) {
        res.status(403).end({error: "nimetus ei tohi olla tühi"})
        return;
    }


    const matk = {
        nimetus: req.body.nimetus,
        pildiUrl: "/assets/Hills.png",
        kirjeldus: req.body.kirjeldus,
        osalejad: []
    }

    await lisaMatk(matk)
    res.status(201).end()
}


module.exports = {
    tagastaSonumid,
    lisaSonum,
    tagastaMatkad,
    looMatk
}