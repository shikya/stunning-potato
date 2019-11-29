// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBrUL5GWjvG2a5p0AWXLxRvVLyviw5vnXk',
    authDomain: 'bookish-pancake.firebaseapp.com',
    databaseURL: 'https://bookish-pancake.firebaseio.com',
    projectId: 'bookish-pancake',
    storageBucket: 'bookish-pancake.appspot.com',
    messagingSenderId: '50367786835',
    appId: '1:50367786835:web:4b9b38ce350abc0b3f3ba6'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.