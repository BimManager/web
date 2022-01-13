const https = require('https');
const qs = require('querystring');

const httpRequests = require('../../../../helpers/httpRequests');

/*
** {
**  token_type: String
**  expires_in: Number (in seconds)
**  access_token: String
** }
*/
function forgeAuth() {
  let _token = null;

  function _get2LeggedToken(credentials) {
    if (_token != null) return Promise.resolve(_token);
    const options = {
      hostname: 'developer.api.autodesk.com',
      port: 443,
      method: 'POST',
      path: '/authentication/v1/authenticate',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    return httpRequests.post(options, qs.stringify(credentials))
      .then(function(token) {
        _token = token;
        setTimeout(function() {
          _token = null
        }, (JSON.parse(token).expires_in - 60) * 1000);
        return Promise.resolve(token);
      })
      .catch(function(err) {
        console.log("error: " + err);
        //return Promise.resolve(err);
      });
  }
  return {
    get2LeggedToken: _get2LeggedToken
  }
}
 
module.exports = forgeAuth();

/*auth.getToken({
    client_id: process.env.FORGE_CLIENT_ID,
    client_secret: process.env.FORGE_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope: 'data:read data:write'
})
  .then((body) => { console.log(body); })
  .catch((err) => { console.error(err); });*/

