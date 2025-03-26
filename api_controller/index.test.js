
const { tagastaMatkad, looMatk } = require('./index');
const { loeMatkadeAndmed, lisaMatk } = require('../data');

jest.mock('../data', () => ({
    loeMatkadeAndmed: jest.fn(),
    lisaMatk: jest.fn(),
}));

describe('tagastaMatkad', () => {
    let req, res;

    beforeEach(() => {
        req = {}; // Mock request object
        res = {
            status: jest.fn().mockReturnThis(), // Mock response.status
            end: jest.fn(), // Mock response.end
            json: jest.fn(), // Mock response.json
        };
        jest.clearAllMocks();
    });

    it('should return matkad data when loeMatkadeAndmed resolves', async () => {
        const mockMatkad = [
            { nimetus: 'Matk 1', kirjeldus: 'Kirjeldus 1' },
            { nimetus: 'Matk 2', kirjeldus: 'Kirjeldus 2' },
        ];
        loeMatkadeAndmed.mockResolvedValue(mockMatkad);

        await tagastaMatkad(req, res);

        expect(loeMatkadeAndmed).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(mockMatkad);
    });

    it('should handle errors from loeMatkadeAndmed gracefully', async () => {
        loeMatkadeAndmed.mockRejectedValue(new Error('Database error'));

        await tagastaMatkad(req, res);

        expect(loeMatkadeAndmed).toHaveBeenCalledTimes(1);
        expect(res.end).toHaveBeenCalledWith({
            error: 'Matkade andmete lugemine ebaõnnestus',
            detailid: 'Database error',
        });
    });
});

describe('looMatk', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}, // Mock request body
        };

        res = {
            status: jest.fn().mockReturnThis(), // Mock response.status
            end: jest.fn(), // Mock response.end
        };
    });

    it('should return 403 if "nimetus" is missing in the request body', async () => {
        req.body = { kirjeldus: 'Test kirjeldus' };

        await looMatk(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.end).toHaveBeenCalledWith({ error: 'nimetus ei tohi olla tühi' });
        expect(lisaMatk).not.toHaveBeenCalled();
    });

    it('should call lisaMatk with the correct data and return 201', async () => {
        req.body = {
            nimetus: 'Test Matk',
            kirjeldus: 'Test kirjeldus',
        };

        await looMatk(req, res);

        expect(lisaMatk).toHaveBeenCalledWith({
            nimetus: 'Test Matk',
            pildiUrl: '/assets/Hills.png',
            kirjeldus: 'Test kirjeldus',
            osalejad: [],
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.end).toHaveBeenCalled();
    });
});
