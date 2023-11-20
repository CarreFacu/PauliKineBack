// tests/person.test.ts
import supertest from 'supertest';
import { app } from '../src/app';
import { Person } from '../src/interface/person.interface';
jest.setTimeout(50000);
describe('Person controller', () => {
    let authToken:string
    // @ts-ignore
    let newPersonResponse:any;
    const personObj: Person ={
        name: "personaNamePrueba",
        surname: "personaSurNamePrueba",
        birthdate: new Date(),
        phone: 1231231212312,
        gender: "F"
    }
    beforeAll(async () => {
        const userCredentials = {username: 'usuario1', password: '1234'};
        const response = await supertest(app)
            .post('/user/login')
            .send(userCredentials);
        authToken = response.text.replace(/"/g, '');
    });

    it('shoud obtein a token when the user log in', () => {
        expect(authToken).toBeDefined();
    });

    describe('Succes model person',()=>{
        it('should create a new person', async () => {
            newPersonResponse = await supertest(app)
                .post('/person/newPerson')
                .set('Authorization', `Bearer ${authToken}`)
                .send(personObj);

            expect(newPersonResponse.status).toBe(201);
            expect(newPersonResponse.body.name).toEqual("personaNamePrueba");
            expect(newPersonResponse.body.surname).toEqual("personaSurNamePrueba");
            expect(newPersonResponse.body.phone).toEqual(1231231212312);
            expect(newPersonResponse.body.gender).toEqual("F");
        });

        it('should get a list of person ', async () => {
            const response = await supertest(app)
                .get('/person/getPerson')
                .set('Authorization', `Bearer ${authToken}`)

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);

            const persons: Person[] = response.body;
            persons.forEach(person => {
                expect(person).toHaveProperty('name');
                expect(person).toHaveProperty('birthdate');
                expect(person).toHaveProperty('surname');
                expect(person).toHaveProperty('phone');
                expect(person).toHaveProperty('gender');
                expect(person.gender).toMatch(/^(F|M)$/);
            });
        });
        it('should delete a person ', async () => {
            const response = await supertest(app)
                .delete(`/person/deletePerson/${newPersonResponse.body._id}`)
                .set('Authorization', `Bearer ${authToken}`)

            expect(response.status).toBe(200);
            expect(response.body.name).toEqual("personaNamePrueba");
            expect(response.body.surname).toEqual("personaSurNamePrueba");
            expect(response.body.phone).toEqual(1231231212312);
            expect(response.body.gender).toEqual("F");
        });
    })
    describe('Error model person',()=>{
        it('should not  delete a person because the person is not found ', async () => {
            const response = await supertest(app)
                .delete(`/person/deletePerson/655bb62f0b23c1e64f706a84`)
                .set('Authorization', `Bearer ${authToken}`)

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'The resource you are trying to delete was not found.' });
        });
    })
});