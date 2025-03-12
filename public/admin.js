const adminSisu = document.getElementById('admin-sisu')

async function loeSonumid() {
    const result = await fetch('/api/sonumid', )
    if (!result.ok) {
        console.log('Viga andmete lugemisel')
        return;
    }

    const sonumid = await result.json()
    console.log(sonumid)
}

async function loeMatkad() {
    const result = await fetch('/api/matkad', )
    if (!result.ok) {
        console.log('Viga andmete lugemisel')
        return;
    }

    const matkad = await result.json()
    console.log(matkad)
    adminSisu.innerHTML = looLeheHTML(matkad)
}

loeSonumid()
loeMatkad()

function looLeheHTML(matkad) {
    const vasakPaan = looVasakPaanHTML(matkad)
    return `
     <div class="row">
        <div class="col-4">
            ${vasakPaan}
        </div>
        <div class="col-8">
            siia tuleb parem paan
        </div>
     </div>
    `
}

function looVasakPaanHTML(matkad) {
    console.log(matkad)
    let vasakPaan = ''
    for (matk of matkad) {
        vasakPaan += `
        <div>
            ${matk.nimetus}
        </div>
        `
    }
    return vasakPaan
}
