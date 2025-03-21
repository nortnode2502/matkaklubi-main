async function registreeriMatkale(matkIndeks) {
    const email = document.getElementById('osalejaEmail').value
    console.log(email)

    const uusEmail = {
        "email": email
    }

    const response = await fetch(`/api/matk/${matkIndeks}/osaleja`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uusEmail)
    })

    if (response.status === 201) {
        alert(email + ' - registreerusid matkale')
    } else {
        alert('Registreerumine ebaõnnestus')
        console.log(response)
    }
}