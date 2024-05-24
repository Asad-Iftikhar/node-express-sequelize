require('dotenv').config(); // Load environment variables from the .env file (if it exists)
const express = require('express'); // Import the Express module to create the web application
const { sequelize } = require('./models');
const userRoutes = require('./routes/UserRoutes');
const globalErrorHandler = require('./middlewares/errorHandler.middleware');

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route handler for the root path ('/')
app.get('/', (req, res) => {
  // Send a simple "Hello World!" response
  res.send('Hello World!');
});

// Define routes By entities
app.use('/users', userRoutes); // Mount user routes under '/users' path

app.use(globalErrorHandler);

// Synchronize sequelize and start the server
sequelize
  .sync()
  .then(() => {
    // Get the port number from the environment variable (or default to 3000)
    const port = process.env.SERVER_PORT || 3000;

    // Start the server and listen for incoming requests on the specified port
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
