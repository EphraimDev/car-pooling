import dotenv from 'dotenv';

dotenv.config();

const databaseURL = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE : process.env.DEV_DATABASE;

export default databaseURL;
