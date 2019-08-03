# join-u

### Style guide

[Airbnb ](https://github.com/airbnb/javascript)(Javascript style guide)

### Tech stack

- [Nodejs](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

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
git clone https://github.com/EphraimDev/join-u.git
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

## Running the tests


### To view the documentation

### Working Routes


## License

This projects is under the ISC LICENSE

## Authors 

[Ephraim Aigbefo](https://github.com/EphraimDev)

## Acknowledgements

