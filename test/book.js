import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.should();
chai.use(chaiHttp);

let token = 'bearer ';
let wrongToken = 'bearer ';

describe('Booking', () => {
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
  it('should produce an error if an invalid trip id is provided', done => {
    chai
      .request(app)
      .post('/api/v1/book-trip/500')
      .set('authorization', token)
      .then(res => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('No trip found');
        done();
      });
  });
  it('should produce an error if token is invalid or not provided', done => {
    chai
      .request(app)
      .post('/api/v1/book-trip/1')
      .set('authorization', wrongToken)
      .then(res => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('Token is invalid or not provided');
        done();
      });
  });
  it('should book a trip', done => {
    chai
      .request(app)
      .post('/api/v1/book-trip/1')
      .set('authorization', token)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.keys(
          'booking_id',
          'trip_id',
          'user_id',
          'seat_number',
          'deleted',
          'created_at',
          'updated_at',
          'deleted_at'
        );
        done();
      });
  });
});
