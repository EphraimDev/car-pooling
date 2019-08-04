import { Pool } from 'pg';
import url from '../config/db';

const connectionString = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : url;

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

export default pool;
