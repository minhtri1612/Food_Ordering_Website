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
            const { cart, street, city, postal, payment } = req.body;
            console.log('Payment method:', payment);
            console.log('Placing order with data:', req.body);

            // Validate the input fields
             if (!cart || !street || !city || !postal || !payment) {
                return res.status(400).send('All fields are required.');
            }
            const items = JSON.parse(cart);
            
            const address = { street, city, postal };

            // Instantiate the orderModel to interact with the order data
            const OrderModel = new orderModel();

            // Create the order and retrieve the order ID and total cost
            const { orderId, total } = await OrderModel.createOrder(req.session.user.id, items, address, payment);
            

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
    //User can cancel an order
    async CancelOrder(req, res) {
        try {
            // Check if the user is logged in and is an admin
            if (!req.session.user) {
                return res.status(403).send('Access denied: Admins only'); // Return 403 if the user is not an admin
            }

            // Extract the order ID from the request parameters
            const orderId = req.params.id;

            // Instantiate the orderModel to interact with the order data
            const OrderModel = new orderModel();

            // Cancel the order in the database
            await OrderModel.CancelOrder(orderId);

            // Redirect to the admin dashboard with a success message
            res.redirect('/cart');
        } catch (error) {
            // Log and handle any errors
            console.error('Error cancelling order:', error);
            res.status(500).send('Internal server error'); // Return a 500 error response
        }
    }
    // Update the status of an order(admin only)
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

    async showOrderForm(req, res) {
        try {
            // const slug = req.params.slug; // Extract the slug from the request parameters

            // const ItemModel = new itemModel();
            // const item = await ItemModel.getItemBySlug(slug); // Fetch the item by its slug
            // if (!item) {
            //     return res.status(404).send('Item not found'); // Return 404 if the item doesn't exist
            // }
            console.log('currentPath:', req.path); // Log the current path for debugging
            // Render the order form with the fetched item data
            res.render('order/place-order', {
                layout: 'user', // Use the public layout
                // item,
                // currentPath: req.path,
                currentPath: req.originalUrl, // Pass the original URL for potential use in the view
                username: req.session.user.username // Pass the current path for potential use in the view
            });
        } catch (error) {
            // Log and handle any errors
            console.error('Error showing order form:', error);
            res.status(500).send('Internal server error');
        }
    }
}

// Exporting an instance of the OrderController class
module.exports = new OrderController();