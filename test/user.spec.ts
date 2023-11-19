// tests/person.test.ts
import supertest from 'supertest';
import { app } from '../src/app';
import { Person } from '../src/interface/person.interface';
jest.setTimeout(50000); // Ajusta según sea necesario
describe('User controller', () => {
    let authToken:string; // Variable para almacenar el token que obtendremos
    const userObj: Person ={
        name: "usuarioNamePrueba",
        surname: "usuarioSurnamePrueba",
        birthdate: new Date(),
        phone: 1231231212312,
        gender: "F"
    }
    beforeAll(async () => {
        // Simulamos un inicio de sesión antes de todas las pruebas
        const userCredentials = {username: 'usuario1', password: '1234'};
        const response = await supertest(app)
            .post('/user/login')
            .send(userCredentials);
        authToken = response.text.replace(/"/g, '');
    });

    it('debería obtener un token al iniciar sesión', () => {
        expect(authToken).toBeDefined();
    });

    it('should create a new person', async () => {
        console.log( `Bearer ${authToken}`)
        const response = await supertest(app)
            .post('/person/newPerson')
            .set('Authorization', `Bearer ${authToken}`) // Asegúrate de ajustar este encabezado según tus necesidades
            .send(userObj);

        expect(response.status).toBe(201);
        expect(response.body.name).toEqual("usuarioNamePrueba");
        expect(response.body.surname).toEqual("usuarioSurnamePrueba");
        expect(response.body.phone).toEqual(1231231212312);
        expect(response.body.gender).toEqual("F");
        //expect(response.body).toEqual({ message: 'Person created successfully' });
    });
});