const query = {
  createUser:
    'INSERT INTO users(email,first_name,last_name,password,is_admin,created_at) values($1,$2,$3,$4,$5,$6) RETURNING user_id, first_name, last_name, email,dob, img, is_admin,street,city,state,country',
  findUserByEmail: 'SELECT * FROM users WHERE email = $1',
  findUserById: 'SELECT * FROM users WHERE user_id=$1',
  updateUser:
    'UPDATE users SET first_name=$1,last_name=$2,password=$3,img=$4,is_admin=$5,street=$6,city=$7,state=$8,country=$9,dob=$10,updated_at=$11 WHERE user_id = $12 RETURNING user_id, first_name, last_name, email, img, is_admin, street, city, state, country, dob',
  findVehicleByPlateNo: 'SELECT * FROM vehicle WHERE number_plate = $1',
  createVehicle:
    'INSERT INTO vehicle(user_id, number_plate, manufacturer, model, year, capacity, color, img, created_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING vehicle_id, number_plate, manufacturer, model, year, capacity, color, img',
  findVehicleById:
    'SELECT vehicle.*, users.first_name, users.last_name, users.email, users.img FROM vehicle INNER JOIN users ON vehicle.user_id = users.user_id WHERE vehicle.vehicle_id=$1',
  updateVehicle:
    'UPDATE vehicle SET number_plate=$1,manufacturer=$2,model=$3,year=$4,capacity=$5,color=$6,img=$7,updated_at=$8 WHERE vehicle_id = $9 RETURNING vehicle_id, number_plate, manufacturer, model, year, capacity, color, img',
  deleteVehicle: 'DELETE FROM vehicle WHERE vehicle_id=$1;',
  createTrip:
    'INSERT INTO trip(user_id,vehicle_id,origin,destination,trip_date,trip_time,fare,created_at) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING trip.*',

  updateTrip:
    'UPDATE trip SET vehicle_id=$1,origin=$2,destination=$3,trip_date=$4,trip_time=$5,fare=$6,status=$7,updated_at=$8 WHERE trip_id = $9 RETURNING trip.*',

  cancelTrip: 'UPDATE trip SET status=$2,deleted=$3,updated_at=$4 WHERE trip_id=$1 RETURNING trip.*;',
  findTripById:
    'SELECT trip.*, users.first_name,users.last_name, users.img,vehicle.number_plate,vehicle.manufacturer,vehicle.model,vehicle.color,vehicle.year,vehicle.capacity FROM trip INNER JOIN users ON trip.user_id = users.user_id INNER JOIN vehicle ON vehicle.vehicle_id=trip.vehicle_id WHERE trip_id=$1',
  viewTrips:
    'SELECT trip.*,users.first_name,users.last_name, users.img,vehicle.number_plate,vehicle.manufacturer,vehicle.model,vehicle.color,vehicle.year from trip INNER JOIN vehicle ON trip.user_id=vehicle.user_id INNER JOIN users ON users.user_id=trip.user_id',
    bookTrip:
    'INSERT INTO booking(trip_id,user_id,created_at,seat_number) VALUES($1,$2,$3,$4) returning *',
    viewBooking:
    'select * from booking where trip_id=$1',
    viewBookings:
    'select * from booking where user_id=$1'
};

export default query;
