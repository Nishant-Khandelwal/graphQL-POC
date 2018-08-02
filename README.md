# graphQL-POC
 
Please refer package JSON file for runnin the project.

"scripts": {
    "start-server": "json-server --watch data/jsonData.json",
    "start": "babel-node ./server.js",
    "relay": "relay-compiler --src ./src --schema ./data/schema.graphql",
    "update-schema": "babel-node ./scripts/updateSchema.js"
  },