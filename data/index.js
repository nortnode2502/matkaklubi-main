const { MongoClient } = require("mongodb")

const andmebaas = "matka-app-2111"
const salasona = process.env.MONGODB_PASSWORD
const mongoUrl = `mongodb+srv://matkaapp:${salasona}@cluster0.exen9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(mongoUrl);

const matk1 = {
    nimetus: "Sügismatk Kõrvemaal",
    pildiUrl: "/assets/Hills.png",
    kirjeldus: "Lähme ja oleme kolm päeva looduses",
    osalejad: ["mati@matkaja.ee", "kati@matkaja.ee"]
}

const matk2 = {
    nimetus: "Süstamatk Hiiumaal",
    pildiUrl: "/assets/Hiker.png",
    kirjeldus: "Lähme ja oleme kolm päeva vee peal",
    osalejad: ["mati@matkaja.ee", "kati@matkaja.ee", "uudo@ryhkija.ee"]
}

let matkad = null

const sonumid = []

async function _muudaMatkaOsalejaid(matk) {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("matkad");
        const result = await matkad.updateOne(
            {_id: matk._id},
            {
               $set: {osalejad: matk.osalejad} 
            }
        )
        return true
      } finally {
        await client.close();
      }    
}


async function loeMatkadeAndmed() {
    if (matkad !== null) {
        return matkad
    }
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkadCollection = database.collection("matkad");
        matkad = await matkadCollection.find({}).toArray()
        return matkad
      } catch(error) {
        console.log(error.message)
        return []
      } finally {
        await client.close();
      }

}

async function lisaOsaleja(matkaIndeks, osalejaEmail) {
    const matk = matkad[matkaIndeks]
    if (!matk) {
        throw Error("Otsitavat matka ei ole")
    }

    if (!osalejaEmail) {
        throw Error("osaleja email peab olema määratud")
    }

    if (matk.osalejad.findIndex( el => el === osalejaEmail) !== -1) {
        throw Error("Osaleja on juba registreerunud")
    }

    matk.osalejad.push(osalejaEmail)

    _muudaMatkaOsalejaid(matk)

}


async function eemaldaOsaleja(matkaId, osalejaId) {
    if (typeof matkad[matkaId] === 'undefined') {
        throw Error("Otsitavat matka ei ole")
    }
    const matk = matkad[matkaId]

    let osalejad = matk.osalejad
    delete osalejad[osalejaId]
    osalejad = osalejad.filter(el => el)

    matk.osalejad = osalejad
    await _muudaMatkaOsalejaid(matk)
    return true
}

function lisaSonum({nimi, sonum}) {
    sonumid.push({nimi, sonum})
}

async function lisaMatk(matk) {
    matkad.push(matk)
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("matkad");
        const result = await matkad.insertOne(matk)
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
      } finally {
        await client.close();
      }
     
}

function loeSonumid() {
    return sonumid
}

module.exports = {
    loeMatkadeAndmed,
    lisaOsaleja,
    lisaSonum,
    loeSonumid,
    lisaMatk,
    eemaldaOsaleja
}

