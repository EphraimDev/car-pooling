const query = {
  createUser: 'INSERT INTO users(email,first_name,last_name,password,is_admin,created_at) values($1,$2,$3,$4,$5,$6) RETURNING user_id, first_name, last_name, email,dob, img, is_admin,street,city,state,country',
  findUserByEmail: 'SELECT * FROM users WHERE email = $1',
  findUserById: 'SELECT * FROM users WHERE id=$1',
  updateUser: 'UPDATE users SET first_name=$1,last_name=$2,password=$3,img=$4,is_admin=$5,street=$6,city=$7,state=$8,country=$9,dob=$10,updated_at=$11 WHERE user_id = $12 RETURNING user_id, first_name, last_name, email, img, is_admin, street, city, state, country, dob',
};

export default query;
