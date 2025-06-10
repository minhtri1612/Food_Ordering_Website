// Importing the orderModel to interact with the order data in the database
const ProfileModel = require('../models/profileModel');

class ProfileController {

    // [POST] /order - Handle placing an order
    async editProfile(req, res) {
        try {
            // Check if the user is logged in
            if (!req.session.user) {
                return res.redirect('/login'); // Redirect to login if the user is not logged in
            }

            // Extract user ID from the session
            const userId = req.session.user.id;

            // Instantiate the Model to interact with the profile data
            const profileModel = new ProfileModel();

            // Fetch the user's profile data
            const userProfile = await profileModel.getUserProfile(userId);

            // Render the profile edit view with the user's profile data
            res.render('profile/edit', {
                layout: 'profile', // Use the user layout
                currentPath: req.originalUrl, // Current path for active link highlighting
                username: req.session.user.username, // Pass the logged-in user data
                profile: userProfile // Pass the user's profile data
            });
        } catch (error) {
            // Log and handle any errors
            console.error('Error editing profile:', error);
            res.status(500).send('Internal server error'); // Return a 500 error response
        }
    }       
}

// Exporting an instance of the OrderController class
module.exports = new ProfileController();