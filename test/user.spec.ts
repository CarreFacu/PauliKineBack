// tests/person.test.ts
import supertest from 'supertest';
import { app } from '../src/app'; // Supongamos que has exportado tu aplicación Express desde otro archivo llamado app.ts o similar

describe('POST /newPerson', () => {
    it('should create a new person', async () => {
        const response = await supertest(app)
            .post('/newPerson')
            .set('Authorization', 'your-auth-token') // Asegúrate de ajustar este encabezado según tus necesidades
            .send({ /* Datos de la nueva persona */ });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Person created successfully' });
    });
});