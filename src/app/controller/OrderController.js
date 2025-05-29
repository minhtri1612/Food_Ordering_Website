// Importing the orderModel to interact with the order data in the database
const orderModel = require('../models/orderModel');

class OrderController {

    // [POST] /order - Handle placing an order
    async placeOrder(req, res) {
        try {
            // Check if the user is logged in
            if (!req.session.user) {
                return res.redirect('/login'); // Redirect to login if the user is not logged in
            }

            // Extract item ID and quantity from the request body
            const { itemId, quantity, street, city, postal, payment } = req.body;

            // Validate the input fields
             if (!itemId || !quantity || quantity <= 0 || !street || !city || !postal || !payment) {
                return res.status(400).send('All fields are required and quantity must be valid.');
            }

            // Create an array of items to be ordered
            const items = [{ itemId: parseInt(itemId), quantity: parseInt(quantity) }];
            const address = { street, city, postal };

            // Instantiate the orderModel to interact with the order data
            const OrderModel = new orderModel();

            // Create the order and retrieve the order ID and total cost
            const { orderId, total } = await OrderModel.createOrder(req.session.user.id, items, address);
            

            // Render the order confirmation page with the order details
            res.render('order/order-confirmation', {
                layout: 'user', // Use the public layout
                orderId, // Pass the order ID
                total, // Pass the total cost of the order
                address,
                payment
            });
        } catch (error) {
            // Log and handle any errors
            console.error('Error placing order:', error);
            res.status(500).send('Internal server error'); // Return a 500 error response
        }
    }

    async updateOrderStatus(req, res) {
        try {
            // Check if the user is logged in and is an admin
            if (!req.session.user || !req.session.user.isAdmin) {
                return res.status(403).send('Access denied: Admins only'); // Return 403 if the user is not an admin
            }

            // Extract the order ID from the request parameters
            const orderId = req.params.id;

            // Extract the new status from the request body
            const { status } = req.body;

            // Validate the status to ensure it is one of the allowed values
            if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
                return res.status(400).send('Invalid status'); // Return 400 if the status is invalid
            }

            // Instantiate the orderModel to interact with the order data
            const OrderModel = new orderModel();

            // Update the order status in the database
            await OrderModel.updateOrderStatus(orderId, status);

            // Redirect to the admin dashboard with a success message
            res.redirect('/me?success=Order+status+updated');
        } catch (error) {
            // Log and handle any errors
            console.error('Error updating order status:', error);
            res.status(500).send('Internal server error'); // Return a 500 error response
        }
    }
}

// Exporting an instance of the OrderController class
module.exports = new OrderController();