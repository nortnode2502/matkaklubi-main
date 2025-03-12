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

    const sonumid = await result.json()
    console.log(sonumid)
}

loeSonumid()
loeMatkad()

function looLeheHTML() {
    return `
     <div class="row">
        <div class="col-4">
            siia tuleb vasa paan
        </div>
        <div class="col-8">
            siia tuleb parem paan
        </div>
     </div>
    `
}
