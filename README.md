# kriscent_task

### TypeScript + Node express JS | Node Version - v20.12.1 | Typescript Version - v5.5.4

To take full advantage folow these steps
- Node.js version ≥ v20.12.1 installed in your local development environment
- Access to a package manager npm

- Create a package.json file
- Create a minimal server with Express
- Installing TypeScript
- Generating tsconfig.json
- Create an Express server with a .ts extension


#### Changes in package.json

Inside our package.json cgange to
"scripts": {
    "tsc": "tsc",
    "start": "node ./dist/app.js",
    "dev": "nodemon ./src/app.ts",
    "build": "npx tsc"
}

#### Create ‘dist’ and ‘src’ folder in the root directory

- `./dist`
- `./src`


#### Basic packages installation
Run these scripts to add the packages -

"dependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/mongoose": "^5.11.97",
    "@types/uuid": "^10.0.0",
    "bcrypt": "^5.1.1",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-validator": "^7.2.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.2",
    "typescript": "^5.5.4",
    "uuid": "^10.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }