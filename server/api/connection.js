const postgresql = require('pg');
const os = require('os');

const { Pool } = postgresql;

/**
 * Creates a connection to a PostgreSQL database and returns the connection object.
 *
 * @param {Function} [callback=null] - An optional callback function to be called with the connection object.
 * @returns {Object} - The connection object.
 */
module.exports = (callback = null) => {
    // Create a new connection pool with the given configuration
    const pool = new Pool({
        user:  process.env.PG_USER, // PostgreSQL username
        password:  process.env.PG_PASSWORD, // PostgreSQL password
        database:  process.env.PG_DATABASE, // PostgreSQL database name
        port: 5432, // PostgreSQL server port
        host:  process.env.PG_HOST, // PostgreSQL server host
        //TODO remove for production
        ssl: { rejectUnauthorized: false }
    });

    // Define the connection object
    const connection = {
        pool, // Connection pool object
        query: (...args) => {
            // Connect to the pool, execute the query, and release the client
            return pool.connect().then((client) => {
                return client.query(...args).then((res) => {
                    client.release();
                    return res.rows;
                });
            });
        },
    };

    // Store the connection object in the process object
    process.postgresql = connection;

    // Call the optional callback function with the connection object
    if (callback) {
        callback(connection);
    }

    // Return the connection object
    return connection;
};
