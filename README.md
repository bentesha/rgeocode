# rGeocode

**rGeocode** is a self-hosted reverse-geocode server for resolving coordinates (WGS84) into administrative areas. Currently, **rGeocode** includes support for `Tanzania` and `Kenya` only. Support for more countries will be added in the future.

## Example
Supply latitude and longitude coordinates to your self-hosted **rGeocode** REST API instance

```
http://localhost:7000/reverse-geocode/?latitude=-6.8075823&longitude=39.2811514
```

**rGeocode** will resolve the coordinates to four levels of administrative areas
```json
{
  "id": "42ecf91f-5e1a-4dc8-8604-610e1a0a98bc",
  "level4_name": "Upanga Mashariki",
  "level3_name": "Ilala",
  "level2_name": "Dar Es Salaam",
  "level1_name": "Coastal",
  "level0_name": "Tanzania",
  "level4_pcode": "TZ030702162",
  "level3_pcode": "TZ030702",
  "level2_pcode": "TZ0307",
  "level1_pcode": "TZ03",
  "level0_pcode": "TZ"
}
```

# Installation

## Using Docker/Docker Compose
The easiest way to run **rGeocode** is through docker-compose.

Clone the repository on your machine and `cd` into the project root, then run docker compose:

```
docker-compose up -d
```

That is it! By default, the server listens on port `7000`.

It will take several seconds on the first run for the database to initialize.

Use the `logs` command to check when the server is ready to accept connections:
```
docker-compose logs --follow rgeocode
```

For more information, check the `docker-compose.yaml` file.

## Manual Installation

Follow below steps to manually install **rGeocode** from the repository:

### 1. Clone Repository
Clone this repository, `cd` into the project root and install dependencies:

```
git clone https://github.com/bentesha/rgeocode.git
cd rgeocode
npm install
```

### 2. Configure MySQL Server
**rGeocode** stores custom map boundaries in a MySQL database. You will need to create a `.env` configuration file in the project root and provide MySQL server details. The `example.env` file is included as starting point.

```
cp example.env .env
```

### 3. Run Database Migrations
Run migrations to create database tables and insert map boundary data:

```
npm run migrate
```

### 4. Start Server

```
npm start
```

By default, **rGeocode** listens on port `7000`. You can change port number in the `.env` file created in step `#2` above.

# How To Use

### Sending Request

Once the server is running, call the REST endpoint `/reverse-geocode`, supplying latitude and longitude coordinates as query parameters.

```
http://localhost:7000/reverse-geocode/?latitude=-6.8075823&longitude=39.2811514
```

>Change server name and port number according to your installation.

### Response
For successful requests, `200` HTTP status code will be returned, along with a JSON response:

```json
{
  "id": "42ecf91f-5e1a-4dc8-8604-610e1a0a98bc",
  "level4_name": "Upanga Mashariki",
  "level3_name": "Ilala",
  "level2_name": "Dar Es Salaam",
  "level1_name": "Coastal",
  "level0_name": "Tanzania",
  "level4_pcode": "TZ030702162",
  "level3_pcode": "TZ030702",
  "level2_pcode": "TZ0307",
  "level1_pcode": "TZ03",
  "level0_pcode": "TZ"
}
```

If the coordinates fails to resolve (falls outside map boundaries), status code `404` will be returned.

# LICENSE
MIT