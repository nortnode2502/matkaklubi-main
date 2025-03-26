const { 
    loeSonumid, 
    lisaSonum : lisaSonumData, 
    loeMatkadeAndmed, 
    lisaMatk,
    lisaOsaleja,
    eemaldaOsaleja
} = require('../data')

const tagastaSonumid = (req, res) => {
    const sonumid = loeSonumid()
    res.json(sonumid)
}

const lisaSonum = (req, res) => {
    console.log(req.body)
    lisaSonumData({nimi: req.body.nimi, sonum: req.body.markus})
    res.status(201).end()
}

const tagastaMatkad = async (req, res) => {
    const matkad = await loeMatkadeAndmed()
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

async function lisaOsalejaCtrl(req, res) {
    if (!req.body.email) {
        res.status(403).end({error: "email ei tohi olla tühi"})
        return
    }

    if (!req.params.id) {
        res.status(403).end({error: "matka id ei ole antud"})
        return
    }

    try {
        const result = await lisaOsaleja(req.params.id, req.body.email)
        if (result) {
            res.status(201).end()
        } else {
            res.status(401).end({error: "osaleja lisamine ebaõnnestus"})
        }
    } catch (error) {
        res.status(401).end({error: "osaleja lisamine ebaõnnestus"})
        return
    }
}

async function kustutaOsalejaCtrl(req, res) {
    if (!req.params.id) {
        res.status(403).end({error: "matka id ei ole antud"})
    }
    
    if (!req.params.osalejaId) {
        res.status(403).end({error: "osaleja id ei ole antud"})
    }

    const result = await eemaldaOsaleja(req.params.id, req.params.osalejaId)
    if (result) {
        res.status(200).end()
    } else {
        res.status(401).end({error: "osaleja lisamine ebaõnnestus"})
    }
}


module.exports = {
    tagastaSonumid,
    lisaSonum,
    tagastaMatkad,
    looMatk,
    lisaOsalejaCtrl,
    kustutaOsalejaCtrl
}