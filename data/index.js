const { MongoClient } = require("mongodb")

const andmebaas = "matka-app-2111"
const salasona = "Test1234"
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

const matkad = [
    matk1,
    matk2,
    {
        nimetus: "Mägimatk Otepääl",
        pildiUrl: "/assets/maed.png",
        kirjeldus: "Lähme ja oleme kolm päeva mägedes",
        osalejad: ["uudo@ryhkija.ee"]
    }
]

const sonumid = []

function loeMatkadeAndmed() {
    return matkad
}

function lisaOsaleja(matkaIndeks, osalejaEmail) {
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

}

function lisaSonum({nimi, sonum}) {
    sonumid.push({nimi, sonum})
}

async function lisaMatk(matk) {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("matkad");
        const result = await matkad.insertOne(uusMatk)
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
    lisaMatk
}

