const fetch = require('node-fetch');

// Netlify Function: /auth/slack
exports.handler = async function(event, context) {
  const params = event.queryStringParameters;
  const code = params.code;

  // Use environment variables for secrets in production
  const client_id = '9133067521076.9119279735127';
  const client_secret = 'cf21215f3024f16efb53fb5b9110132f';
  const redirect_uri = 'https://agentflowmosaia.netlify.app/auth/slack';

  if (!code) {
    return {
      statusCode: 400,
      body: 'Missing code parameter from Slack.'
    };
  }

  // Exchange code for access token
  const tokenRes = await fetch('https://slack.com/api/oauth.v2.access', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id,
      client_secret,
      redirect_uri
    })
  });
  const tokenData = await tokenRes.json();

  if (!tokenData.ok) {
    return {
      statusCode: 400,
      body: `Slack OAuth failed: ${tokenData.error}`
    };
  }

  // Redirect to frontend with info as query params
  return {
    statusCode: 302,
    headers: {
      Location: `https://agentflowmosaia.netlify.app/slack-agent?user_id=${tokenData.authed_user.id}&team_id=${tokenData.team.id}&access_token=${tokenData.access_token}`
    },
    body: ''
  };
}; 