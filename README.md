This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts Root Folder

In the project directory, you can run:

### `npm run dev`

Runs the application in development mode. Uses a package called concurrently to launch the 
temporary backend server on port 3001, while also running the webpack / CRA development server on port 3000, allowing for hot reloading during development.

### `npm start`

Runs the node server only.

## Available Scripts Client Folder

In the client directory, you can run:

### `npm run build:tailwind`

Builds the frontend app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance. In addition, it utilizes the postcss package allowing us to bundle/use tailwind css with the project. 

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


