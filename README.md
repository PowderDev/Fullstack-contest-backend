# Test task for Sector Business

## To start with Docker:

### 1. Make db.env with:

```
  MYSQL_ROOT_PASSWORD=<your_password>
  MYSQL_DATABASE=<your_db_name>
```

### 2. Make .env with:

```
  DATABASE_URL="mysql://root:<your_password>@mysql:3306/<your_db_name>"
```

#### You can use prisma via "prisma" container
