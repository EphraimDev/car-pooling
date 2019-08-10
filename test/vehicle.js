import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/app';

chai.should();

chai.use(chaiHttp);
let token = 'bearer ';
let anotherToken = 'bearer ';

describe('Vehicles', () => {
  describe('POST /api/v1/vehicles', () => {
    it('should sign in', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'non@test.co',
          password: 'Qwerty',
        })
        .then((res) => {
          const { body } = res;
          token += body.data.token;
          done();
        });
    });

    it('should sign in', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'another@test.co',
          password: 'Password1!',
        })
        .then((res) => {
          const { body } = res;
          anotherToken += body.data.token;
          done();
        });
    });

    it('should add a vehicle', (done) => {
      chai.request(app)
        .post('/api/v1/vehicles')
        .set('authorization', token)
        .field('number_plate', 'ABC12')
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('year', '1234')
        .field('capacity', '5')
        .attach('image', './test/files/autograder.png', 'autograder.png')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(201);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('object');
          done();
        });
    });

    it('should check for bus that already exists', (done) => {
      chai.request(app)
        .post('/api/v1/vehicles')
        .set('authorization', token)
        .field('number_plate', 'ABC12')
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('year', '1234')
        .field('capacity', '5')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(409);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('A vehicle with same plate number already exists');
          done();
        });
    });

    it('should validate vehicle plate number', (done) => {
      chai.request(app)
        .post(`/api/v1/vehicles`)
        .set('authorization', token)
        .field('color', 'W')
        .then((res) => {
            const body = res.body;
            expect(res.status).to.equal(422);
            expect(body).to.contain.property('error');
            expect(body.error).to.be.a("string");
            expect(body.error).to.equal('"number_plate" is required');
            done()
        })
    });
  });

  describe('PATCH /api/v1/vehicles/:vehicleId', () => {

    it('should update a vehicle', (done) => {
      chai.request(app)
        .patch('/api/v1/vehicles/1')
        .set('authorization', token)
        .field('number_plate', 'ABC12')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(200);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('object');
          done();
        });
    });

    it('should check for vehicle that does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/vehicles/5')
        .set('authorization', token)
        .field('number_plate', 'ABC12')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(404);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Vehicle does not exist');
          done();
        });
    });

    it('should check for authorized user', (done) => {
      chai.request(app)
        .patch(`/api/v1/vehicles/1`)
        .set('authorization', anotherToken)
        .field('number_plate', 'ABC12R')
          .then((res) => {
            const body = res.body;
            expect(res.status).to.equal(401);
            expect(body).to.contain.property('status');
            expect(body).to.contain.property('error');
            expect(body.status).to.equal('error');
            expect(body.error).to.be.a('string');
            expect(body.error).to.equal('Unauthorized user');
            done()
          })
    });
  });

  describe('GET /api/v1/vehicles/:vehicleId', () => {

    it('should return a vehicle data', (done) => {
      chai.request(app)
        .get('/api/v1/vehicles/1')
        .set('authorization', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(200);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('object');
          done();
        });
    });

    it('should check for vehicle that does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/vehicles/5')
        .set('authorization', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(404);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Vehicle does not exist');
          done();
        });
    });
  });
});
