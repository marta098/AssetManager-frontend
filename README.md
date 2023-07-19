# AssetManager-frontend
AssetManager is asset management software which enables the tracking of equipment. The main purpose is to improve communication between company employees and IT departments during asset exchange or new asset assignment process.

The frontend (client) application consists of smaller pieces of code called components, which serve the same purpose as JavaScript functions but operate in isolation and return HTML code.
The base component in the Asset Manager application is the App component, which, depending on the provided Uniform Resource Locator (URL), invokes its assigned component. The "components" folder contains smaller modules that interact with other larger components. For example, there are modules that handle error handling, pre-built button templates, and notification components. Building larger, more complex components becomes significantly easier by importing selected functionalities from smaller modules. The "constraints" folder stores rules used in the client-side application, including constants that define the base URL for communication with the server-side application. The "hooks" folder contains functions (hooks) that allow sharing behavior related to state among components. The most extensive components, composed of grouped elements, are located in the "pages" folder, creating complete pages. The "services" folder holds services used for communication between the frontend and backend applications. Each file contains functions for retrieving or sending data using the HTTP protocol. The "styles" folder contains a CSS file with a global set of styles. In the Asset Manager client application, styles are also directly embedded within the components. The last element of the structure is the "utils" folder, which contains data formatting utilities.
##Versions
Make sure you are using below versions:

* Node.js ^v16 (you can install it from [here](https://nodejs.org/))
## How to run

* `npm install`

Installs all project packages which are located in ```package-lock.json```.

* `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
Please make sure, that you execute a command in the project's root directory (the folder that contains the package.json file)
Client application will send requests to server application via base URL defined in ```.env``` file.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Another scripts
* `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

* `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
