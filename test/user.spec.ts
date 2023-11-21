// tests/person.test.ts
import supertest from 'supertest';
import { app } from '../src/app';
import { User } from '../src/interface/user.interface';
jest.setTimeout(50000);
describe('Person controller', () => {
    let authToken:string
    // @ts-ignore
    let newUserResponse:any;
    const userObj: User ={
        username:"usuarioUserNamePrueba",
        password:"usuarioPasswordPrueba",
        rol:"admin"
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

    describe('Succes model User',()=>{
        it('should create a new user', async () => {
            newUserResponse = await supertest(app)
                .post('/user/newUser')
                .set('Authorization', `Bearer ${authToken}`)
                .send(userObj);

            expect(newUserResponse.status).toBe(201);
            expect(newUserResponse.body.username).toEqual("usuarioUserNamePrueba");
            expect(newUserResponse.body.rol).toEqual("admin");
        });

        it('should get a list of user ', async () => {
            const response = await supertest(app)
                .get('/user/getUsers')
                .set('Authorization', `Bearer ${authToken}`)

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);

            const users: User[] = response.body;
            users.forEach(user => {
                expect(user).toHaveProperty('username');
                expect(user).toHaveProperty('password');
                expect(user).toHaveProperty('rol');
            });
        });

        it('should delete a user ', async () => {
            const response = await supertest(app)
                .delete(`/user/deleteUser/${newUserResponse.body._id}`)
                .set('Authorization', `Bearer ${authToken}`)

            expect(response.status).toBe(200);
            expect(response.body.username).toEqual("usuarioUserNamePrueba");
            expect(newUserResponse.body.rol).toEqual("admin");
        });
    })
    describe('Error model user',()=>{
        it('should not delete a user because the person is not found ', async () => {
            const response = await supertest(app)
                .delete(`/user/deleteUser/655bb62f0b23c1e64f706a84`)
                .set('Authorization', `Bearer ${authToken}`)

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'The resource you are trying to delete was not found.' });
        });
    })
});