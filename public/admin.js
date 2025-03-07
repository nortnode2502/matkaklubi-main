async function loeSonumid() {
    const result = await fetch('/api/sonumid', )
    if (!result.ok) {
        console.log('Viga andmete lugemisel')
        return;
    }

    const sonumid = await result.json()
    console.log(sonumid)
}

loeSonumid()