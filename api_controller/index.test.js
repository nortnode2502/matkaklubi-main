const { lisaOsalejaCtrl } = require('./index.js');
const { lisaOsaleja } = require('../data');

jest.mock('../data', () => {
    return {
        lisaOsaleja: jest.fn()
    }
})

describe('lisaOsalejaCtrl', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            end: jest.fn()
        }
    })

    it('kui email puudub, siis tagastatakse 403', async () => {
        await lisaOsalejaCtrl(req, res)
        expect(res.status).toBeCalledWith(403)
        expect(res.end).toBeCalled()
    })

    it('kui osaleja lisamine õnnestub, siis tagastatakse 201', async () => {
        const osaleja = "test@test.ee"
        req.body.email = osaleja
        req.params.id = "1"
        lisaOsaleja.mockReturnValue(true)
        await lisaOsalejaCtrl(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.end).toBeCalled()
        expect(lisaOsaleja).toBeCalledWith(req.params.id, osaleja)
    })

    it('osaleja lisamisel andmebaasiviga tagastatakse 401', async () => {
        lisaOsaleja.mockRejectedValue(new Error("Andmebaasiviga"))
        const osaleja = "test@test.ee"
        req.body.email = osaleja
        req.params.id = "1"
        await lisaOsalejaCtrl(req, res)
        expect(res.status).toBeCalledWith(401)
    })
})