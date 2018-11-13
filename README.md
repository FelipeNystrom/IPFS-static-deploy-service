# IPFS DEPLOY SERVICE

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
and is deployed on [IPFS](https://ipfs.io/) (Inter Planetary File System)

## Available Scripts

In the project directory, you can run:

### `npm run client-dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run client-build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run ipfs-deploy`

Deploy to IPFS through remote or your already installed and active localnode. This script checks if the build folder exists and then add it to IPFS. After adding your files it also publishes your static site using IPNS (Inter Planetary Name System). It links to your peerId witch allows you to deploy multiple times with same URL. This also enables DNS link to be established if you want to have a more human readable format.
