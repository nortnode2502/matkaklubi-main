const adminSisu = document.getElementById('admin-sisu')
let matkad = []

async function loeSonumid() {
    const result = await fetch('/api/sonumid', )
    if (!result.ok) {
        console.log('Viga andmete lugemisel')
        return;
    }

    const sonumid = await result.json()
    console.log(sonumid)
}

async function loeMatkadJaKuvaLeht() {
    const result = await fetch('/api/matkad', )
    if (!result.ok) {
        console.log('Viga andmete lugemisel')
        return;
    }

    matkad = await result.json()
    adminSisu.innerHTML = looLeheHTML(matkad)
    naitaParemPaan(0)
}

function looLeheHTML(matkad) {
    const vasakPaan = looVasakPaanHTML(matkad)
    return `
     <div class="row">
        <div class="col-4">
            ${vasakPaan}
        </div>
        <div id="parem-paan-sisu" class="col-8">
            siia tuleb parem paan
        </div>
     </div>
    `
}

function looVasakPaanHTML(matkad) {
    console.log(matkad)
    let vasakPaan = ''
    let id = 0
    for (matk of matkad) {
        vasakPaan += `
        <div class="vasak-paan-valik" onclick="naitaParemPaan(${id})">
            ${matk.nimetus}
        </div>
        `
        id += 1
    }
    return vasakPaan
}

function naitaParemPaan(matkaId) {
    const paremPaan = document.getElementById('parem-paan-sisu')
    const matk = matkad[matkaId]

    let osalejadHTML = ''
    matk.osalejad.forEach(email => {
        osalejadHTML += `
        <li>${email}  </li>
        `
    });

    const paremPaanHtml = `
    <h3>${matk.nimetus}</h3>
    <div>${matk.kirjeldus}</div>
    <ol>
        ${osalejadHTML}
    </ol
    `
    paremPaan.innerHTML = paremPaanHtml
}

loeMatkadJaKuvaLeht()
