/* tslint:disable */
// @ts-nocheck
const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent) {
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }
    if (environmentFileContent !== '') {
      console.log(`wrote variables to ${targetPath}`);
    }
  });
}

// Providing path to the `environments` directory
const envDirectory = './src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

//creates the `environment.prod.ts` and `environment.ts` file if it does not exist
writeFileUsingFS('./src/environments/environment.prod.ts', '');
writeFileUsingFS('./src/environments/environment.ts', '');

// Checks whether command line argument of `prod` was provided signifying production mode
const isProduction = environment === 'prod';

// choose the correct targetPath based on the environment chosen
const targetPath = './src/environments/environment.ts';

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `
  export const environment = {
    FIREBASE_PROJECT_ID : '${process.env.FIREBASE_PROJECT_ID}',
    FIREBASE_APP_ID : '${process.env.FIREBASE_APP_ID}',
FIREBASE_DATABASE_URL : '${process.env.FIREBASE_DATABASE_URL}',
FIREBASE_STORAGE_BUCKET : '${process.env.FIREBASE_STORAGE_BUCKET}',
FIREBASE_API_KEY : '${process.env.FIREBASE_API_KEY}',
FIREBASE_AUTH_DOMAIN: '${process.env.FIREBASE_AUTH_DOMAIN}',
FIREBASE_MESSAGING_SENDER_ID : '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
FIREBASE_MEASUREMENT_ID : '${process.env.FIREBASE_MEASUREMENT_ID}',
    
  };
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file

/* tslint:enable */
