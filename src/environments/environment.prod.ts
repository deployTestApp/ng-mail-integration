export const environment = {
  production: true
};

export const mailServers = {
  "sendGrid": {
      "uri" : "https://api.sendgrid.com/v3/mail/send",
      "api_key": "test_api"
  },
  "mailGun": {
      "uri" : "https://api.mailgun.net/v3",
      "api_key": "test_api",
      "domain": "sandbox"
  },
  "maxRetryCount": 3
};
