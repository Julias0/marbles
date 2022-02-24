const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


const axios = require('axios').default;

module.exports = {
  sendMessage: async function (user, channel, message) {
    return await axios.post('https://slack.com/api/chat.postMessage', {
      'text': message,
      'channel': channel
    },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-type': 'application/json'
        }
      }
    );
  },
  oauthAccess: async function (code) {
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('client_id', CLIENT_ID);
    bodyFormData.append('client_secret', CLIENT_SECRET);
    bodyFormData.append('code', code);
    return await axios.post('https://slack.com/api/oauth.v2.access', bodyFormData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}



