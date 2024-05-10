const mysql = require('mysql2/promise');
const fetch = require('node-fetch'); // or use axios

// Function to fetch JSON data
async function fetchJSONData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}

// Function to insert data into MySQL database
async function insertDataIntoDatabase(data) {
    try {
        // Create MySQL connection
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'your_mysql_username',
            password: 'your_mysql_password',
            database: 'your_database_name'
        });

        // Iterate over each channel
        for (const channel of data[0].data.channels) {
            const id = channel.id;
            const clearkey = channel.clearkeys && channel.clearkeys.length > 0 ? JSON.stringify(channel.clearkeys[0].base64) : null;

            // Insert data into database
            if (id && clearkey) {
                await connection.execute('INSERT INTO clearkeys (id, clearkey) VALUES (?, ?)', [id, clearkey]);
            }
        }

        // Close MySQL connection
        await connection.end();
    } catch (error) {
        console.error('Error inserting data into database:', error);
    }
}

// Main function
async function main() {
    const jsonDataUrl = 'https://tplayapi.code-crafters.app/321codecrafters/fetcher.json';
    const jsonData = await fetchJSONData(jsonDataUrl);

    if (jsonData) {
        await insertDataIntoDatabase(jsonData);
        console.log('Data inserted into database successfully.');
    } else {
        console.log('Failed to fetch JSON data.');
    }
}

// Execute main function
main();
