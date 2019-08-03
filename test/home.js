import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/app';

chai.should();

chai.use(chaiHttp);

describe('Welcome page', () => {
    it('should display welcome text', (done) => {
        chai.request(app)
        .get('/')
        .then((res) => {
            expect(res.status).to.equal(200);
            done()
        })
    })
})