// Importing the required models
const itemModel = require('../models/itemModel');
const orderModel = require('../models/orderModel');

class homeController {

    // Public homepage (/public-home)
    async publicHome(req, res) {
        const ItemModel = new itemModel(); // Instantiate the item model
        const item = await ItemModel.showitem(); // Fetch all items from the database
        res.render('public-home', {
            currentPath: req.originalUrl,
            layout: 'public', // Use the public layout
            item: item, // Pass the fetched items to the view
            user: {
            location: 'Regent Street, A4, A4201, London'
            },
            cart: {
            items: 23,
            total: '79.89'
            },
            suggestions: [
                {
                    name: "Margherita Pizza",
                    description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
                    price: 12.99,
                    image: "/img/pizza.webp"
                },
                {
                    name: "Grilled Salmon",
                    description: "Freshly grilled salmon with lemon herb sauce.",
                    price: 18.50,
                    image: "/img/deals/burger.jpg"
                },
                {
                    name: "Caesar Salad",
                    description: "Crisp romaine lettuce with creamy Caesar dressing.",
                    price: 8.99,
                    image: "/img/deals/salad.jpg"
                },
                 {
                    name: "Margherita Pizza",
                    description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
                    price: 12.99,
                    image: "/img/pizza.webp"
                },
                {
                    name: "Grilled Salmon",
                    description: "Freshly grilled salmon with lemon herb sauce.",
                    price: 18.50,
                    image: "/img/deals/burger.jpg"
                },
                {
                    name: "Caesar Salad",
                    description: "Crisp romaine lettuce with creamy Caesar dressing.",
                    price: 8.99,
                    image: "/img/deals/salad.jpg"
                },
                 {
                    name: "Margherita Pizza",
                    description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
                    price: 12.99,
                    image: "/img/pizza.webp"
                },
                {
                    name: "Grilled Salmon",
                    description: "Freshly grilled salmon with lemon herb sauce.",
                    price: 18.50,
                    image: "/img/deals/burger.jpg"
                },
                {
                    name: "Caesar Salad",
                    description: "Crisp romaine lettuce with creamy Caesar dressing.",
                    price: 8.99,
                    image: "/img/deals/salad.jpg"
                }
            ],
            exclusiveDeals: [
            {
                image: '/img/deals/burger.jpg',
                alt: 'Chef Burgers London',
                discount: '-40%',
                type: 'Restaurant',
                name: 'Chef Burgers London'
            },
            {
                image: '/img/deals/salad.jpg',
                alt: 'Grand Ai Cafe London',
                discount: '-20%',
                type: 'Restaurant',
                name: 'Grand Ai Cafe London'
            },
            {
                image: '/img/deals/sandwich.jpg',
                alt: 'Butterbrot Cafe London',
                discount: '-17%',
                type: 'Restaurant',
                name: 'Butterbrot Cafe London'
            }
            ],
            categories: [
            { image: '/img/burger.jpg', name: 'Burgers & Fast food', count: 21 },
            { image: '/img/salad.jpg', name: 'Salads', count: 32 },
            { image: '/img/pasta.png', name: 'Pasta & Casuals', count: 4 },
            { image: '/img/pizza.webp', name: 'Pizza', count: 32 },
            { image: '/img/breakfast.jpg', name: 'Breakfast', count: 4 },
            { image: '/img/soup.jpg', name: 'Soups', count: 32 }
            ],
            restaurants: [
            { image: '/img/restaurants/mcdonalds.svg', name: "McDonald's London" },
            { image: '/img/restaurants/papajohns.jpg', name: "Papa Johns" },
            { image: '/img/restaurants/kfc.png', name: "KFC West London" },
            { image: '/img/restaurants/texas-chicken.jpg', name: "Texas Chicken" },
            { image: '/img/restaurants/burger-king.png', name: "Burger King" },
            { image: '/img/restaurants/shaurma.avif', name: "Shaurma 1" }
            ],
            statistics: [
            { number: '546+', label: 'Registered Riders' },
            { number: '789,900+', label: 'Orders Delivered' },
            { number: '690+', label: 'Restaurants Partnered' },
            { number: '17,457+', label: 'Food Items' }
            ]
        });
    }

    // User homepage (/user)
    async userHome(req, res) {
        // Check if the user is logged in
        if (!req.session.user) {
            return res.redirect('/login'); // Redirect to login if not logged in
        }

        // Prevent admins from accessing the user homepage
        if (req.session.user.isAdmin) {
            return res.redirect('/admin'); // Redirect admins to the admin dashboard
        }

        const ItemModel = new itemModel(); // Instantiate the item model
        const item = await ItemModel.showitem(); // Fetch all items from the database
        res.render('user/home-user', {
            currentPath: req.path,
            layout: 'user', // Use the user layout
            username: req.session.user.username, // Pass the logged-in user's username
            item: item, // Pass the fetched items to the view
            user: {
            location: 'Regent Street, A4, A4201, London'
            },
            
            exclusiveDeals: [
            {
                image: '/img/deals/burger.jpg',
                alt: 'Chef Burgers London',
                discount: '-40%',
                type: 'Restaurant',
                name: 'Chef Burgers London'
            },
            {
                image: '/img/deals/salad.jpg',
                alt: 'Grand Ai Cafe London',
                discount: '-20%',
                type: 'Restaurant',
                name: 'Grand Ai Cafe London'
            },
            {
                image: '/img/deals/sandwich.jpg',
                alt: 'Butterbrot Cafe London',
                discount: '-17%',
                type: 'Restaurant',
                name: 'Butterbrot Cafe London'
            },
            {
                image: '/img/deals/burger.jpg',
                alt: 'Chef Burgers London',
                discount: '-40%',
                type: 'Restaurant',
                name: 'Chef Burgers London'
            },
            {
                image: '/img/deals/burger.jpg',
                alt: 'Chef Burgers London',
                discount: '-40%',
                type: 'Restaurant',
                name: 'Chef Burgers London'
            },
            {
                image: '/img/deals/burger.jpg',
                alt: 'Chef Burgers London',
                discount: '-40%',
                type: 'Restaurant',
                name: 'Chef Burgers London'
            },
            {
                image: '/img/deals/burger.jpg',
                alt: 'Chef Burgers London',
                discount: '-40%',
                type: 'Restaurant',
                name: 'Chef Burgers London'
            },
            {
                image: '/img/deals/burger.jpg',
                alt: 'Chef Burgers London',
                discount: '-40%',
                type: 'Restaurant',
                name: 'Chef Burgers London'
            },
            ],
            categories: [
            { image: '/img/burger.jpg', name: 'Burgers & Fast food', count: 21 },
            { image: '/img/salad.jpg', name: 'Salads', count: 32 },
            { image: '/img/pasta.png', name: 'Pasta & Casuals', count: 4 },
            { image: '/img/pizza.webp', name: 'Pizza', count: 32 },
            { image: '/img/breakfast.jpg', name: 'Breakfast', count: 4 },
            { image: '/img/soup.jpg', name: 'Soups', count: 32 }
            ],
            suggestions: [
                {
                    id: 1,
                    name: "Margherita Pizza",
                    description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
                    price: 12.99,
                    image: "/img/pizza.webp"
                },
                {
                    id: 2,
                    name: "Grilled Salmon",
                    description: "Freshly grilled salmon with lemon herb sauce.",
                    price: 18.50,
                    image: "/img/deals/burger.jpg"
                },
                {
                    id: 3,
                    name: "Caesar Salad",
                    description: "Crisp romaine lettuce with creamy Caesar dressing.",
                    price: 8.99,
                    image: "/img/deals/salad.jpg"
                },
                 {
                    id: 4,
                    name: "Margherita Pizza",
                    description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
                    price: 12.99,
                    image: "/img/pizza.webp"
                },
                {
                    id: 5,
                    name: "Grilled Salmon",
                    description: "Freshly grilled salmon with lemon herb sauce.",
                    price: 18.50,
                    image: "/img/deals/burger.jpg"
                },
                {
                    id: 6,
                    name: "Caesar Salad",
                    description: "Crisp romaine lettuce with creamy Caesar dressing.",
                    price: 8.99,
                    image: "/img/deals/salad.jpg"
                },
                {
                    id: 7,
                    name: "Margherita Pizza",
                    description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
                    price: 12.99,
                    image: "/img/pizza.webp"
                },
                {
                    id: 8,
                    name: "Grilled Salmon",
                    description: "Freshly grilled salmon with lemon herb sauce.",
                    price: 18.50,
                    image: "/img/deals/burger.jpg"
                },
                {
                    id: 9,
                    name: "Caesar Salad",
                    description: "Crisp romaine lettuce with creamy Caesar dressing.",
                    price: 8.99,
                    image: "/img/deals/salad.jpg"
                }
            ],
            statistics: [
            { number: '546+', label: 'Registered Riders' },
            { number: '789,900+', label: 'Orders Delivered' },
            { number: '690+', label: 'Restaurants Partnered' },
            { number: '17,457+', label: 'Food Items' }
            ]
            
        });
    }

    // Place an order
    async placeOrder(req, res) {
        
        try {
            // Check if the user is logged in
            if (!req.session.user) {
                return res.redirect('/login'); // Redirect to login if not logged in
            }

            // Extract item ID and quantity from the request body
            const { itemId, quantity } = req.body;

            // Validate the input fields
            if (!itemId || !quantity || quantity <= 0) {
                return res.status(400).send('Item ID and valid quantity are required'); // Return 400 if validation fails
            }

            // Create an array of items to be ordered
            const items = [{ itemId: parseInt(itemId), quantity: parseInt(quantity) }];

            const OrderModel = new orderModel(); // Instantiate the order model
            const { orderId, total } = await OrderModel.createOrder(req.session.user.id, items); // Create the order

            // Render the order confirmation page with the order details
            res.render('order/order-confirmation', {
                layout: 'public', // Use the public layout
                orderId, // Pass the order ID
                total // Pass the total cost of the order
            });
        } catch (error) {
            // Log and handle any errors
            console.error('Error placing order:', error);
            res.status(500).send('Internal server error'); // Return a 500 error response
        }
    }

    // Search for items
    async search(req, res) {
        try {
            const query = req.query.query; // Extract the search query from the request parameters
            const ItemModel = new itemModel(); // Instantiate the item model
            const items = await ItemModel.searchItems(query); // Search for items matching the query

            // Return the search results as JSON
            res.json({ query, items });
        } catch (error) {
            // Log and handle any errors
            console.error('Error in search:', error);
            res.status(500).send('Internal server error'); // Return a 500 error response
        }
    }

    async menu(req, res) {
        try {
            // Check if the user is logged in
            if (!req.session.user) {
                return res.redirect('/login');
                
                 // Redirect to login if not logged in
            }

            // Prevent admins from accessing the user homepage
            if (req.session.user.isAdmin) {
                return res.redirect('/admin'); // Redirect admins to the admin dashboard
            }

            // Fetch all items from the database
            const ItemModel = new itemModel();
            const items = await ItemModel.showitem();

            // Render the menu view with the fetched data
            res.render('item/menu', {
                layout: 'user', // Use the user layout
                items, // Pass the fetched items to the view
                // currentPath: req.path,
                currentPath: req.originalUrl,
                username: req.session.user.username,
                user: {
                location: 'Regent Street, A4, A4201, London'
                }, // Pass the current path for active link highlighting
                
            });
        } catch (error) {
            // Log the error for debugging
            console.error('Error in menu:', error);

            // Render an error page or send a user-friendly error message
            res.status(500).render('error', {
                layout: 'public', // Use a public layout for error pages
                message: 'An error occurred while loading the menu. Please try again later.',
            });
        }
    }

    restaurant(req, res) {
        // Check if the user is logged in
        if (!req.session.user) {
            return res.redirect('/login'); // Redirect to login if not logged in
        }

        // Prevent admins from accessing the user homepage
        if (req.session.user.isAdmin) {
            return res.redirect('/admin'); // Redirect admins to the admin dashboard
        }

        // Render the restaurant view with the user layout
        res.render('order/restaurant', {
            layout: 'user', // Use the user layout
            username: req.session.user.username, // Pass the logged-in user's username
            currentPath: req.originalUrl, // Pass the current path for active link highlighting
        });
    }
    
}

// Exporting an instance of the homeController class
module.exports = new homeController();