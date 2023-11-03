# Blog App CI

This application consists of two projects: Blog-list-backend and Blog-list-frontend.
Both projects have been made as exercises on Full Stack Open course.
This project is to



# Blog-list-backend
Full Stack Open -course exercise

In Progress

Backend for Blog-list. Currently has `blogs` and `users` endpoints with CRUD operations. Also has `login` endpoint for creating a JsonWebToken that is required when creating and deleting blogs.


## Setup

### Environment
Requires following environment variables:
- MONGODB_URI
  - MongoDB database connection string
- PORT
  - Available port for API to listen to
- TEST_MONGODB_URI
  - MongoDB testing database connection string
- SECRET
  - JsonWebToken encryption string. Any string.

### npm scripts
- npm start
  - Runs project in production mode
- npm run dev
  - Runs project in development mode
  - Uses nodemon for faster development
- npm test
  - Runs tests
  - Uses test database
- npm lint
  - Runs ESLint checks
