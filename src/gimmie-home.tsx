import React from "react";
import { client } from "./server";
import { HelloGimmie } from "./hello-gimmie";

import {
  Actions,
  Home,
  PheliaHomeProps,
  ImageBlock,
  Section,
  Text,
  Button
} from "phelia";

function buttonClick(ev: any, userId: string) {
  client.postMessage(HelloGimmie, userId);
}

export function GimmieHome({useState, useModal, user}: PheliaHomeProps) {
  return (
    <Home>
      <ImageBlock 
          emoji
          alt="Hey There!"
          imageUrl="https://i.ibb.co/1sKxnWv/gimmie-home.png" />
      <Section>
        <Text emoji>Looking good {user.username}! :green_heart:</Text>
      </Section>
      <Section>
        <Text emoji>What is it you're looking for?</Text>
      </Section>
      <Actions>
        <Button action="test" onClick={(event) => buttonClick(event, user.id)}>
          Hi There!
        </Button>
      </Actions>
    </Home>
  );
}