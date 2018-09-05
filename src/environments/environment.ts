// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
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
}

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
