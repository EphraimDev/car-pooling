import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.should();
chai.use(chaiHttp);

let token = 'bearer ';
let wrongToken = 'bearer ';

describe('Trips', () => {
  it('should sign a registered user in', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'non@test.co',
        password: 'Qwerty'
      })
      .then(res => {
        const { body } = res;
        token += body.data.token;
        done();
      });
  });
  it('should produce an error if an invalid vehicle id is provided', done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('authorization', token)
      .send({
        vehicle: '500',
        origin: 'Lekki',
        destination: 'Ajah',
        date: '13/09/2019',
        time: '12:00',
        fare: '1900'
      })
      .then(res => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Vehicle does not exist');
        done();
      });
  });
  it('should produce an error if vehicle id is not provided', done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('authorization', token)
      .send({
        vehicle: '',
        origin: 'Lekki',
        destination: 'Ajah',
        date: '13/09/2019',
        time: '12:00',
        fare: '1900'
      })
      .then(res => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('"vehicle" is not allowed to be empty');
        done();
      });
  });
  it('should produce an error if origin is not provided', done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('authorization', token)
      .send({
        vehicle: '1',
        origin: '',
        destination: 'Ajah',
        date: '13/09/2019',
        time: '12:00',
        fare: '1900'
      })
      .then(res => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('"origin" is not allowed to be empty');
        done();
      });
  });
  it('should produce an error if destination is not provided', done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('authorization', token)
      .send({
        vehicle: '1',
        origin: 'Lekki',
        destination: '',
        date: '13/09/2019',
        time: '12:00',
        fare: '1900'
      })
      .then(res => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal(
          '"destination" is not allowed to be empty'
        );
        done();
      });
  });
  it('should produce an error if date is not provided', done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('authorization', token)
      .send({
        vehicle: '1',
        origin: 'Lekki',
        destination: 'Ajah',
        date: '',
        time: '12:00',
        fare: '1900'
      })
      .then(res => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('"date" is not allowed to be empty');
        done();
      });
  });
  it('should produce an error if time is not provided', done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('authorization', token)
      .send({
        vehicle: '1',
        origin: 'Lekki',
        destination: 'Ajah',
        date: '13/09/2019',
        time: '',
        fare: '1900'
      })
      .then(res => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('"time" is not allowed to be empty');
        done();
      });
  });
  it('should produce an error if fare is not provided', done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('authorization', token)
      .send({
        vehicle: '1',
        origin: 'Lekki',
        destination: 'Ajah',
        date: '13/09/2019',
        time: '12:00',
        fare: ''
      })
      .then(res => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('"fare" is not allowed to be empty');
        done();
      });
  });
  it('should produce an error if token is invalid or not provided', done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('authorization', wrongToken)
      .then(res => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('Token is invalid or not provided');
        done();
      });
  });
  it('should create a new trip', done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('authorization', token)
      .send({
        vehicle: '1',
        origin: 'Lekki',
        destination: 'Ajah',
        date: '13/09/2019',
        time: '12:00',
        fare: '1900'
      })
      .then(res => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.keys(
          'trip_id',
          'user_id',
          'vehicle_id',
          'origin',
          'destination',
          'trip_date',
          'trip_time',
          'fare',
          'status',
          'deleted',
          'created_at',
          'updated_at',
          'deleted_at'
        );
        done();
      });
  });
});
