require("dotenv").config();
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user.model');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;
const router = require('express').Router();


const oauth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);

// Generate the Google authentication URL
router.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
  res.json({ url: authUrl });
});

// Handle the Google authentication callback
router.get('/auth/google/callback', async (req, res, next) => {
  const { code } = req.query;

  try {
    // Exchange the authentication code for an access token and user information
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const { data } = await google.people({ version: 'v1', auth: oauth2Client }).people.get({
      resourceName: 'people/me',
      personFields: 'names,emailAddresses',
    });
    const { names, emailAddresses } = data;
    const { displayName } = names[0];
    const { value: email } = emailAddresses[0];

    // Create a new user profile in your app and save their data to your MongoDB database
    console.log(email)
    const user = await User.findOneAndUpdate(
      { email },
      { displayName, google: { id: tokens.user_id, accessToken: tokens.access_token, refreshToken: tokens.refresh_token } },
      { upsert: true, new: true }
    );
    res.set("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    // Redirect the user to your application homepage or dashboard
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error authenticating with Google');
  }
});

module.exports = router;
