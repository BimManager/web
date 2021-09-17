const express = require('express');

const { UserProfileApi } = require('forge-apis');

const { OAuth } = require('./common/oauth');

const router = express.Router();

router.get('/user/profile', async (req, res) => {
  debugger;
  const oauth = new OAuth(req.session);
  const internalToken = await oauth.getInternalToken();
  const user = new UserProfileApi();
  const profile = await user.getUserProfile(oauth.getClient(), internalToken);
  res.json({
    name: profile.body.firstName + ' ' + profile.body.lastName,
    picture: profile.body.profileImages.sizeX40
  });
});

module.exports = router;
