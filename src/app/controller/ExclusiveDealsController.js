// Importing the itemModel to interact with the item database
const exclusive_deals = require('../models/exclusiveDealsModel');

    class ExclusiveDealsController {

    // [GET] /item/create - Render the item creation page
    create(req, res, next) {

        res.render('exclusiveDeals/create', { layout: 'admin' }); // Render the 'create' view with the admin layout
    }
    async store(req, res) {
        try {
            // Check if the user is logged in and is an admin
            if (!req.session.user || !req.session.user.isAdmin) {
                return res.status(403).json({ message: 'Access denied: Admins only' }); // Return 403 if unauthorized
            }

            // Extract data from the request body
            const { image, discount, name} = req.body;

            // Validate input fields
            if (!name || !discount || !image) {
                return res.status(400).json({ message: 'Name, description, and image are required' }); // Return 400 if validation fails
            }

            // Create an itemData object to store the exclusive deal details
            const itemData = { image, discount, name };

            // Instantiate itemModel and call the additem method
            const Exclusive_deals = new exclusive_deals();
            const result = await Exclusive_deals.addExclusiveDeals(itemData);

            // Respond with success and return the new item's ID
            return res.status(201).json({
                message: 'Item added successfully',
                itemId: result.insertId
            });
        } catch (error) {
            // Log and handle any errors
            console.error('Error in addItem controller:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


}

// Exporting an instance of the ItemController class
module.exports = new ExclusiveDealsController();

