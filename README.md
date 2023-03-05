## To start with Docker:

### Make an .env file in the root directory
```
  DATABASE_URL="mysql://root:<your_password>@mysql:3306/<your_db_name>"
  POSTGRES_PASSWORD=<password>
  POSTGRES_DB=<your_db_name>
  PGDATA=<path_to_pg_data>
```

### Run the docker-compose file
```
  docker-compose up -d
```


### API will be available on port 4000
