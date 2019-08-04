const query = {
  createUser: 'INSERT INTO users(email,first_name,last_name,password,is_admin,created_at) values($1,$2,$3,$4,$5,$6) RETURNING user_id, first_name, last_name, email,dob, img, is_admin,street,city,state,country',
  findUserByEmail: 'SELECT * FROM users WHERE email = $1',
};

export default query;
