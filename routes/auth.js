const CLIENT_ID = process.env.CLIENT_ID;
console.log({ CLIENT_ID });

const router = require('express').Router();
const User = require('../models/user.model');
const slackService = require('../services/slack');

router.get('/auth', (req, res) => {
  res.redirect(`https://slack.com/oauth/v2/authorize?client_id=${CLIENT_ID}&scope=app_mentions:read,im:history,im:write&user_scope=im:history,mpim:history,channels:history,groups:history`);
});

router.get('/callback', async (req, res) => {
  const { state, code } = req.query;
  try {
    const oauthRes = await slackService.oauthAccess(code);
    const existingUser = await User.findOne({ userSlackId: oauthRes.data.authed_user.id });

    if (!existingUser) {
      const newUser = new User({
        userSlackId: oauthRes.data.authed_user.id,
        botUserId: oauthRes.data.bot_user_id,
        teamId: oauthRes.data.team.id,
        accessToken: oauthRes.data.access_token
      });

      await newUser.save();
    } else {
      existingUser.accessToken = oauthRes.data.access_token;
      await newUser.save();
    }

    res.send('Connected!');
  } catch (error) {
    console.log(error);
    res.send('Failed');
  }
});

module.exports = router;