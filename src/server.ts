import dotenv from "dotenv";
import express from "express";
import { createEventAdapter } from "@slack/events-api";
import Phelia from "phelia";
import { GimmieHome } from "./gimmie-home";
import { HelloGimmie } from "./hello-gimmie";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
var path = require('path');

var fs = require('fs');
var jsonfile = require('jsonfile');

// Prepare mocks
// TODOS: 
// - Move into its own module 
// - Setup watch on dir for new files
let gimmieData = {
  "mocks": [] as any[]
}

const mockDir = "./src/mocks"
const dest = "./src/data/gimmie.json";

fs.readdirSync(mockDir).forEach((file: any) => {
  file = mockDir + '/' + file;
  jsonfile.readFile(file, function (err: Error, obj: Object) {
    if (err) console.error(err)
    gimmieData.mocks.push(obj);
    jsonfile.writeFile(dest, gimmieData)
      .then((res: any) => {
        //TODO: Write result after all mocks, not re-write after each
      })
      .catch((error: Error) => console.error(error))    
  })
})

// Register Phelia client
export const client = new Phelia(process.env.SLACK_TOKEN)
client.registerComponents([GimmieHome, HelloGimmie]);

// Create Slack Event Adapter
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
slackEvents.on("app_home_opened", client.appHomeHandler(GimmieHome));

// Configure EndPoints
app.get('/', function(req, res) {
  console.log('hi')
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(
  "/events", slackEvents.requestListener()
);

app.post(
  "/interactions",
  client.messageHandler(process.env.SLACK_SIGNING_SECRET)
);

// Run
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});