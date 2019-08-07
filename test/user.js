import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/app';

chai.should();

chai.use(chaiHttp);

let token = "bearer ";
let noneToken = '';

describe('Users Profile', () => {
    describe('POST /api/v1/auth/signin', () => {
        it('should log in a user',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: "non@test.co",
                password: "Password1!"
            })
            .then((res) => {
                const body = res.body;
                token += body.data.token;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('token');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
        });
    });

    describe('PATCH /api/v1/user/userId', () => {
        it('should update a user profile', (done) => {
            chai.request(app)
              .patch(`/api/v1/user/1`)
              .set('authorization', token)
                .field('first_name', 'Way')
                .field('last_name', 'Fare')
                .field('is_admin', 'true')
                .field('password', 'Qwerty')
                .attach('image', './test/files/autograder.png', 'autograder.png')
                .then((res) => {
                    const body = res.body;
                    expect(res.status).to.equal(200);
                    expect(body).to.contain.property('status');
                    expect(body).to.contain.property('data');
                    expect(body.status).to.equal("success");
                    expect(body.data).to.be.an("object");
                    done()
                })
          });

          it('should update a user profile', (done) => {
            chai.request(app)
              .patch(`/api/v1/user/1`)
              .set('authorization', token)
                .field('state', 'Lagos')
                .then((res) => {
                    const body = res.body;
                    expect(res.status).to.equal(200);
                    expect(body).to.contain.property('status');
                    expect(body).to.contain.property('data');
                    expect(body.status).to.equal("success");
                    expect(body.data).to.be.an("object");
                    done()
                })
          });

          it('should check if user is authorized',  (done) => {
            chai.request(app)
            .patch(`/api/v1/user/${1}`)
            .set('authorization', noneToken)
            .field('first_name', 'Way')
            .field('last_name', 'Fare')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(401);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Token is invalid or not provided");
                done()
            })
        });

        it('should check if user exists',  (done) => {
            chai.request(app)
            .patch(`/api/v1/user/12`)
            .set('authorization', token)
            .field('first_name', 'Way')
            .field('last_name', 'Fare')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("User does not exist");
                done()
            })
        });

        it('should validate user input', (done) => {
            chai.request(app)
              .patch(`/api/v1/user/1`)
              .set('authorization', token)
                .field('first_name', 'W')
                .field('last_name', 'Fare')
                .then((res) => {
                    const body = res.body;
                    expect(res.status).to.equal(422);
                    expect(body).to.contain.property('error');
                    expect(body.error).to.be.a("string");
                    expect(body.error).to.equal('"first_name" length must be at least 3 characters long');
                    done()
                })
          });
        
    });
})