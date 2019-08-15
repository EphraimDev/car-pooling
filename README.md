[![Build Status](https://travis-ci.com/EphraimDev/car-pooling.svg?branch=develop)](https://travis-ci.com/EphraimDev/car-pooling)    <!-- [![Coverage Status](https://coveralls.io/repos/github/EphraimDev/car-pooling/badge.svg?branch=develop)](https://coveralls.io/github/EphraimDev/car-pooling?branch=develop)    [![Maintainability](https://api.codeclimate.com/v1/badges/3b4023d98af2067e3fc3/maintainability)](https://codeclimate.com/github/EphraimDev/car-pooling/maintainability)     [![Test Coverage](https://api.codeclimate.com/v1/badges/3b4023d98af2067e3fc3/test_coverage)](https://codeclimate.com/github/EphraimDev/car-pooling/test_coverage) -->

# Car-pooling

### Style guide

[Airbnb ](https://github.com/airbnb/javascript)(Javascript style guide)

### Tech stack

- [Nodejs](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Mocha](https://mochajs.org/)
- [Chai](http://www.chaijs.com/)

### Features

- Users can create an account and log in.
- Authenticated users can update their profile
- Authenticated users can add vehicles.
- Authenticated users can update vehicle specs.
- Authenticated users can delete vehicles.
- Authenticated admins can delete vehicles.
- Authenticated users can view all trips.
- Authenticated users can create trips.
- Authenticated users can cancel trip their own trip.
- Authenticated users can start trip.
- AUthenticated users can modify a trip that hasn't started.
- Authenticated admins can cancel trips.
- Authenticated users can book trips.
- Authenticated users can modify bookings.
- Authenticated users can cancel bookings.
- Authenticated users can view all bookings belonging to them.
- Authenticated admins can cancel bookings.
- Authenticated admins can view all bookings.
- Authenticated users can search for trips by origin, destination or both.
- Authenticated admins can delete a user profile

## Installing

#### Prerequisites

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

Ensure you have **Postgresql server** installed on your local machine by entering `postgres -V` on your terminal
If you don't have **PostgreSQL** installed, go to the [PostgreSQL website](https://www.postgresql.org/) and follow the download instructions

To install this app

```
git clone https://github.com/EphraimDev/car-pooling.git
```

cd into the project folder and install the required dependencies

```
npm install
```
Set up PostgreSQL database

```
Open the pgAdmin app on your local machine and create a database
```

Create a `.env` file by running `cp .env.sample .env` on your terminal

Update your `.env` file with the necessary informations

Run server

```
npm run start:dev
```

## Running the tests

To run test cases

```
npm test
```

### To view the documentation

### Working Routes

<table>
<thead>
<tr>
<th>Endpoint</th>
<th>Functionality</th>
</tr>
</thead>
<tbody>
<tr>
<td>POST api/v1/auth/signup</td>
<td>Create new user</td>
</tr>
<tr>
<td>POST api/v1/auth/signin</td>
<td>Sign in user</td>
</tr>
<tr>
<td>PATCH api/v1/user/:userId</td>
<td>Modify user data</td>
</tr>
<tr>
<td>GET api/v1/user/:userId</td>
<td>Fetch user data</td>
</tr>
<tr>
<td>POST api/v1/vehicles</td>
<td>Create new vehicle</td>
</tr>
<tr>
<td>PATCH api/v1/vehicles/:vehicleId</td>
<td>Fetch vehicle data</td>
</tr>
<tr>
<td>GET api/v1/vehicles/:vehicleId</td>
<td>Fetch all trips</td>
</tr>
</tbody></table>

## License

This projects is under the ISC LICENSE

## Authors 

[Ephraim Aigbefo](https://github.com/EphraimDev)

## Acknowledgements

