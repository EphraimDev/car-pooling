import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/app';

chai.should();

chai.use(chaiHttp);

describe('Users Authentication', () => {
    describe('POST /api/v1/auth/signup', () => {

        it('should add a user', (done) => {
            chai.request(app)
              .post('/api/v1/auth/signup')
              .send({
                email: 'non@test.co',
                first_name: 'Way',
                last_name: 'Farer',
                password: 'Password1!',
              })
              .then((res) => {
                const { body } = res;
                expect(res.status).to.equal(201);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('token');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done();
              });
          });

        it('should check if user exists',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'non@test.co',
                first_name: 'Way',
                last_name: 'Farer',
                password: 'Password1!'
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(409);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("User exists already");
                done()
            })
        });

        it('should check for no password',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test@test.co",
                first_name: "Abe",
                last_name: "Farer"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(422);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal('"password" is required');
                done()
            })
        });
    });
})