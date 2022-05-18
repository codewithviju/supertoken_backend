const express = require("express");

let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let cors = require("cors");
const app = express();
const port = 3001;

let { Google } = ThirdPartyEmailPassword;

supertokens.init({
  framework: "express",
  supertokens: {
    // These are the connection details of the app you created on supertokens.com
    connectionURI:
      "https://69669691d59f11ecb6281b2b0cb888eb-us-east-1.aws.supertokens.io:3567",
    apiKey: "TSiBkIx4lwJ5z=v8YcGJTL73jvnUwL",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "My Demo App",
    apiDomain:
      "https://b27c-106-222-64-170.in.ngrok.io" || "http://localhost:3001", // Here API URL
    websiteDomain:
      "https://0158-106-222-64-170.in.ngrok.io" || "http://localhost:3000", // Front end URL
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      providers: [
        Google({
          clientId: "",
          clientSecret: "",
        }),
      ],
    }),
    Session.init(), // initializes session features
  ],
});

let { middleware } = require("supertokens-node/framework/express");

app.use(
  cors({
    origin:
      "https://0158-106-222-64-170.in.ngrok.io" || "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());

let { errorHandler } = require("supertokens-node/framework/express/index.js");
// ...your API routes

// Add this AFTER all your routes
app.use(errorHandler());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
