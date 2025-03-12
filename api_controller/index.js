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

module.exports = {
    tagastaSonumid,
    lisaSonum,
    tagastaMatkad
}