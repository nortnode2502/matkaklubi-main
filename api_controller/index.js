const { loeSonumid, lisaSonum : lisaSonumData } = require('../data')

const tagastaSonumid = (req, res) => {
    const sonumid = loeSonumid()
    res.json(sonumid)
}

const lisaSonum = (req, res) => {
    console.log(req.body)
    lisaSonumData({nimi: req.body.nimi, sonum: req.body.markus})
    res.status(201).end()
}

module.exports = {
    tagastaSonumid,
    lisaSonum
}