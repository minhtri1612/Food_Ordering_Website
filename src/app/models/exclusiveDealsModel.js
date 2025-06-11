// Importing the database connection utility and the slugify library
const { getConnection } = require('../../db'); 



class exclusiveDealsModel {

   
    // Method to add a new item to the database
    addExclusiveDeals(itemData) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection(); // Establish a database connection

              

                // SQL query to insert the item into the database
                const sql = 'INSERT INTO exclusiveDeals (image, discount, name) VALUES (?, ?, ?)';
                const values = [itemData.image, itemData.discount, itemData.name];

                // Execute the query and resolve the result
                const [result] = await connection.execute(sql, values);
                await connection.end(); // Close the database connection
                resolve(result);
            } catch (error) {
                console.error('Error adding item:', error); // Log any errors
                reject(error); // Reject the promise with the error
            }
        });
    }

     // Method to fetch all items from the database
    showitem() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection(); // Establish a database connection
                const sql = 'SELECT * FROM exclusiveDeals'; // SQL query to fetch all items
                const [rows] = await connection.execute(sql); // Execute the query
                await connection.end(); // Close the database connection
                resolve(rows); // Resolve the promise with the fetched rows
            } catch (error) {
                console.error('Error fetching items:', error); // Log any errors
                reject(error); // Reject the promise with the error
            }
        });
    }

   
}

// Exporting the itemModel class for use in other parts of the application
module.exports =exclusiveDealsModel;