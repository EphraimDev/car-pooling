import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.should();
chai.use(chaiHttp);

let token = 'bearer ';
let token2 = 'bearer ';
let tripId = 0;

describe('Trips', () => {
  describe('Create a trip', () => {
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
    it('should sign a registered user in', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'another@test.co',
          password: 'Password1!'
        })
        .then(res => {
          const { body } = res;
          token2 += body.data.token;
          done();
        });
    });
    it('should add a vehicle', done => {
      chai
        .request(app)
        .post('/api/v1/vehicles')
        .set('authorization', token)
        .field('number_plate', 'ABC12')
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('year', '1234')
        .field('capacity', '1')
        .attach('image', './test/files/autograder.png', 'autograder.png')
        .then(res => {
          const { body } = res;
          expect(res.status).to.equal(201);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('object');
          done();
        });
    });
    it('should add another vehicle', done => {
      chai
        .request(app)
        .post('/api/v1/vehicles')
        .set('authorization', token)
        .field('number_plate', 'ABC123E')
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('year', '1234')
        .field('capacity', '1')
        .then(res => {
          expect(res.status).to.equal(201);
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
          expect(res.body.error).to.equal(
            '"vehicle" is not allowed to be empty'
          );
          done();
        });
    });
    it('should produce an error if origin is not provided', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          vehicle: '2',
          origin: '',
          destination: 'Ajah',
          date: '13/09/2019',
          time: '12:00',
          fare: '1900'
        })
        .then(res => {
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal(
            '"origin" is not allowed to be empty'
          );
          done();
        });
    });
    it('should produce an error if destination is not provided', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          vehicle: '2',
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
          vehicle: '2',
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
          vehicle: '2',
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
          vehicle: '2',
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
        .set('authorization', '')
        .then(res => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Token is invalid or not provided');
          done();
        });
    });
    it('should produce an error if the user is not authorized', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('authorization', token2)
        .send({
          vehicle: '2',
          origin: 'Lekki',
          destination: 'Ajah',
          date: '13/09/2019',
          time: '12:00',
          fare: '1900'
        })
        .then(res => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Unauthorized access');
          done();
        });
    });
    it('should produce an error if no trips are found', done => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .set('authorization', token)
        .then(res => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('No trip found');
          done();
        });
    });
    it('should create a new trip', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          vehicle: '2',
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

    it('should create a second trip', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          vehicle: '3',
          origin: 'Lekki',
          destination: 'Ajah',
          date: '13/12/2019',
          time: '12:00',
          fare: '1900'
        })
        .then(res => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });
  describe('Find Trip', () => {
    it('finds a trip by id', done => {
      chai
        .request(app)
        .get('/api/v1/trips/1')
        .set('authorization', token)
        .then(res => {
          expect(res.status).to.equal(200);
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
            'deleted_at',
            'first_name',
            'last_name',
            'img',
            'number_plate',
            'manufacturer',
            'model',
            'color',
            'year',
            'capacity'
          );
          done();
        });
    });
    it('should produce an error if token is invalid or not provided', done => {
      chai
        .request(app)
        .get('/api/v1/trips/1')
        .set('authorization', '')
        .then(res => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Token is invalid or not provided');
          done();
        });
    });
    it('should produce an error if an invalid trip id is provided', done => {
      chai
        .request(app)
        .get('/api/v1/trips/500')
        .set('authorization', token)
        .then(res => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Trip does not exist');
          done();
        });
    });
  });
  describe('View all Trips', () => {
    it('finds all trips data', done => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .set('authorization', token)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.keys(
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
            'deleted_at',
            'first_name',
            'last_name',
            'img',
            'number_plate',
            'manufacturer',
            'model',
            'color',
            'year'
          );
          done();
        });
    });
    it('should produce an error if token is invalid or not provided', done => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .set('authorization', '')
        .then(res => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Token is invalid or not provided');
          done();
        });
    });
  });
  describe('Update trip', () => {
    it('should produce an error if an invalid trip id is provided', done => {
      chai
        .request(app)
        .patch('/api/v1/trips/500')
        .set('authorization', token)
        .send({
          vehicle: '2',
          origin: 'Berger',
          destination: 'Ikeja',
          date: '19/11/2019',
          time: '20:00',
          fare: '2000'
        })
        .then(res => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Trip does not exist');
          done();
        });
    });
    it('should produce an error if the user is not authorized', done => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .set('authorization', token2)
        .send({
          vehicle: '1',
          origin: 'Berger',
          destination: 'Ikeja',
          date: '19/11/2019',
          time: '20:00',
          fare: '2000'
        })
        .then(res => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Unauthorized user');
          done();
        });
    });
    // it('should produce an error if the status is not pending', done => {
    //   chai
    //     .request(app)
    //     .patch('/api/v1/trips/1')
    //     .set('authorization', token)
    //     .send({
    //       vehicle: '1',
    //       origin: 'Berger',
    //       destination: 'Ikeja',
    //       date: '19/11/2019',
    //       time: '20:00',
    //       fare: '2000',
    //       status: 'Pending'
    //     })
    //     .then(res => {
    //       // expect(res.status).to.equal(200);
    //       console.log(res);
    //       done();
    //     });
    // });
    it('should update a trip', done => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .set('authorization', token)
        .send({
          vehicle: '2',
          origin: 'Berger',
          destination: 'Ikeja',
          date: '19/11/2019',
          time: '20:00',
          fare: '2000',
          status: 'Pending'
        })
        .then(res => {
          expect(res.status).to.equal(200);
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

    it('should update the second trip', done => {
      chai
        .request(app)
        .patch(`/api/v1/trips/2`)
        .set('authorization', token)
        .send({
          vehicle: '3',
          origin: 'Lekki',
          destination: 'Ajah',
          date: '13/12/2019',
          time: '12:00',
          fare: '1900',
          status: 'Started'
        })
        .then(res => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should update the second trip', done => {
      chai
        .request(app)
        .patch(`/api/v1/trips/2`)
        .set('authorization', token)
        .send({
          vehicle: '3',
          origin: 'Lekki',
          destination: 'Ajah',
          date: '13/12/2019',
          time: '12:00',
          fare: '1900',
          status: 'Pending'
        })
        .then(res => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Invalid trip update');
          done();
        });
    });
  });
  describe('Cancel trip', () => {
    it('should produce an error if an invalid trip id is provided', done => {
      chai
        .request(app)
        .delete('/api/v1/trips/500')
        .set('authorization', token)
        .then(res => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Trip not found');
          done();
        });
    });
    it('should produce an error if the user is not authorized', done => {
      chai
        .request(app)
        .delete('/api/v1/trips/1')
        .set('authorization', token2)
        .then(res => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Unauthorized access');
          done();
        });
    });
    it('should produce an error if the trip has started', done => {
      chai
        .request(app)
        .delete('/api/v1/trips/2')
        .set('authorization', token)
        .then(res => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Trip cannot be cancelled');
          done();
        });
    });
    it('should cancel a trip', done => {
      chai
        .request(app)
        .delete('/api/v1/trips/1')
        .set('authorization', token)
        .then(res => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should produce an error for trip that has ended or cancelled', done => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .set('authorization', token)
        .send({
          vehicle: '2',
          origin: 'Berger',
          destination: 'Ikeja',
          date: '19/11/2019',
          time: '20:00',
          fare: '2000',
          status: 'Pending'
        })
        .then(res => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal("Trip is no more active");
          done();
        });
    });
  });
});
