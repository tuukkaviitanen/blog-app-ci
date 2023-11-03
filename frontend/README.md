# blog-list-frontend

Front end application for blog-list-backend using Vite+React.

## Setup

- run `npm install`

- run `npm run build` to run with backend

OR

- run `npm run dev` to run separately with hot reload (backend should still be run in the background in port 3001)

When running with `npm run dev`, it's important to use port 3001 for the backend as vite uses a proxy to forward all traffic from `/api` endpoint to port 3001 (the port can be changed in vite.config.js if port 3001 is in use).
