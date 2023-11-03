# Blog App CI

This application consists of two projects: Blog-list-backend and Blog-list-frontend.
Both projects have been made as exercises on the Full Stack Open course.
This project is to create a deployment pipeline for the fullstack app as a whole.

The backend is in the repository root and the frontend project is in the subdirectory `frontend`

Application is live on [Render](https://blog-list-app.onrender.com/)
There is a guest user with `guest` as username and password.
The hosting service is free tier so it might take some time to load at first.

## CI/CD

The project uses GitHub Actions to run a Deployment workflow every time code is pushed (or pulled) to `main` branch or a pull request is opened.

The workflow is separated into three jobs.

Jobs 2 and 3 are run only if `main` branch is updated. NOT when pull request is opened.

1. `run_tests` runs tests on frontend and backend
2. `tag_release` tags the commit with a sematic version. Bumps version up by one patch by default. Learn more about the tag-action [here](https://github.com/anothrNick/github-tag-action)
3. `deployment` deploys main branch to Render and waits for the deployment to be completed. Learn more about the [deploy-action](https://github.com/johnbeynon/render-deploy-action) and the [wait action](https://github.com/Bounceapp/render-action)


# Blog-list-backend
Full Stack Open -course exercise

Backend for Blog-list. Currently has `blogs` and `users` endpoints with CRUD operations. Also has `login` endpoint for creating a JsonWebToken that is required when creating and deleting blogs.

## Setup

- run `npm install`

### Environment
Requires following environment variables:
- MONGODB_URI
  - MongoDB database connection string
- PORT
  - Available port for API to listen to
- TEST_MONGODB_URI
  - MongoDB testing database connection string
- SECRET
  - JsonWebToken encryption string. Any string. The longer and more random the better.

These can be set in a .env file. There is a .env.template file for reference.

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
