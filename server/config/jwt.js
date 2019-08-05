import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_KEY;

export default secret;
