# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Description
Project based on JavaScript with React v18.2.0, using Babel as the transpiler. Markup constructed with HTML5 and styling built mainly with CSS modules, the layout presented is CSS Flexbox.
Among the libraries utilized we find react-router-dom for routing purposes, react-icons as an icon provider, the calendar was created with react-datepicker, moment and moment-timezone to manage dates and bootstrap for the photo gallery.

### Folder PATH listing

GRUPO-11\FRONT\BOOKING\SRC
|   App.css
|   App.jsx
|   App.test.js
|   index.css
|   index.js
|   logo.svg
|   reportWebVitals.js
|   setupTests.js
|   
+---components
|   |   BookingConfirm.jsx
|   |   Home.jsx
|   |   Login.jsx
|   |   Product.jsx
|   |   ProductForm.jsx
|   |   ProtectedRoutes.jsx
|   |   ProtectedRoutesAdmin.jsx
|   |   Register.jsx
|   |   
|   \---tools
|           BookingChart.jsx
|           CalendarSearch.jsx
|           Card.jsx
|           Categories.jsx
|           Footer.jsx
|           Header.jsx
|           Menu.jsx
|           PhotoGallery.jsx
|           ProductBooking.jsx
|           ProductDetail.jsx
|           Searchbox.jsx
|           
+---contexts
|       UserContext.jsx
|       
+---customHooks
|       useWindowDimensions.jsx
|       
+---data
|       cardElements.json
|       categoriesData.json
|       cities.js
|       
+---img
|       icon-facebook.png
|       icon-ig.png
|       icon-linkedin.png
|       iconCalendar.svg
|       iconFBMobile.png
|       iconIGMobile.png
|       iconLIMobile.png
|       iconLocation.svg
|       iconTWMobile.png
|       logo-1.png
|       menu-i.png
|       showPassIcon.png
|       tweet.png
|       X.png
|       
+---services
|       bookingService.js
|       categoryService.js
|       citiesService.js
|       featureService.js
|       productService.js
|       
\---styles
        bookingChart.module.css
        bookingConfirm.module.css
        calendarSearch.css
        card.module.css
        categories.module.css
        footer.module.css
        header.module.css
        home.module.css
        login.module.css
        menu.module.css
        photoGallery.module.css
        product.module.css
        productBooking.module.css
        productForm.module.css
        register.module.css
        searchbox.module.css

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
