// Import your script file
import { getUserChanDetails, getKey } from './tpkeys.js';

// Define the serverless function
module.exports = async (req, res) => {
    const id = req.query.id; // Get the value of 'id' query parameter
    if (!id) {
        return res.status(400).send('ID parameter is missing');
    }

    try {
        const key = await getKey(id); // Execute getKey function
        res.send(key); // Send the key as response
    } catch (error) {
        console.error('Error getting key:', error);
        res.status(500).send('Internal server error');
    }
};
