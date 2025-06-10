// Importing the database connection utility and the slugify library
const { getConnection } = require('../../db'); 



class exclusiveDealsModel {

   
    // Method to add a new item to the database
    addExclusiveDeals(itemData) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection(); // Establish a database connection

              

                // SQL query to insert the item into the database
                const sql = 'INSERT INTO exclusiveDeals (image discount, name) VALUES (?, ?, ?)';
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

   
}

// Exporting the itemModel class for use in other parts of the application
module.exports =exclusiveDealsModel;