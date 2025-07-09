const request = require("supertest");
const server = require("../index");


//GET
describe("GET/cafes", () => {
    it('deberia devolver un status code 200', async () => {
        const response = await request(server).get('/cafes')
        expect(response.status).toBe(200)
    })
    it('deberia responder con un arreglo con al menos un objeto', async () => {
        const response = await request(server).get('/cafes')
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(typeof response.body[0]).toBe("object");
    })
});

//DELETE
describe("DELETE/cafes/:id", () => {
    it("Deberia responder con staus 404  al intentar eliminar un café con un id que no existe", async () => {
        const id = "10"
        const response = await request(server)
            .delete(`/cafes/${id}`)
            .set("Authorization", "fake-token")
        expect(response.status).toBe(404)
    })
})

//POST
describe("POST/cafes", () => {
    describe('Deberia tener la propiedad id', () => {
        const newCafe = {
            id: "5",
            nombre: "Café de prueba"
        }
        it('Deberia agregar un nuevo cafe y responder con status 201', async () => {
            const response = await request(server).post('/cafes').send(newCafe)
            expect(response.status).toBe(201)
            expect(Array.isArray(response.body)).toBe(true);
        })
    })
})

//PUT
describe("PUT/cafes/:id", () => {
    it('Deberia devolver un status code 400 cuando el id sea invalido', async () => {
        const updateCafe = {
            id: "4",
            nombre: "Café de prueba"
        }
        const response = await request(server)
            .put('/cafes/invalid-id')
            .send(updateCafe)
        expect(response.status).toBe(400)
    })
})

