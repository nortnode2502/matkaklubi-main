const { loeSonumid } = require('../data')


const tagastaSonumid = (req, res) => {
    const sonumid = loeSonumid()
    res.json(sonumid)
}

module.exports = {
    tagastaSonumid
}