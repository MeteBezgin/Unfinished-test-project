Stack:
- PostgreSQL database
- Nest.js Backend
- React + Vite Frontend

## Requirements
- node
- yarn
- docker

## Fetch dependencies

```
cd frontend
yarn
cd ../backend
yarn
```

## Database

First launch the database 
```
chmod +x /db/start-dev-db.sh 
./db/start-dev-db.sh
```

## Launch backend

Next launch the backend. It will create the database schema automatically.

Nest.js provides two launch modes:

Simple run:
```
cd backend
yarn start
```

Dev mode – watches for changes:
```
cd backend
yarn start:dev
```

The backend will be available under `localhost:3000`.

## Launch frontend

```
cd frontend
yarn dev
```

The frontend will be available under `localhost:3001`.

The Vite dev server is configured in a way, that calls to `/api` will be redirected to the backend:
- `POST localhost:3001/api/images/upload` will be redirected as `POST localhost:3000/images/upload`
- `GET localhost:3001/api` will be redirected as `GET localhost:3000`
