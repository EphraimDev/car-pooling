import { it } from 'mocha';
import {assert, expect} from 'chai';
import AuthController from '../server/controller/Auth';


it('should return undefined', async (req, res) => {
    // const req = {
    //     body: {
    //         none: 'asdf'
    //     }
    // }
    const signup = await AuthController.signup;
    console.log(signup)
    assert.equal(book, undefined);
});

