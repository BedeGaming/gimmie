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

export const client = new Phelia(process.env.SLACK_TOKEN)
client.registerComponents([GimmieHome, HelloGimmie]);

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
slackEvents.on("app_home_opened", client.appHomeHandler(GimmieHome));

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
