import React from "react";
import person from "./mocks/person.json";

import {
  Message,
  PheliaMessageProps,
  Section,
  Text
} from "phelia";

export function HelloGimmie ({ useState }: PheliaMessageProps) {

  function formatJsonObject(obj: Object) {
    return "```\n" + 
            JSON.stringify(obj, null, 2)+
          "\n```";
  }

  return (
    <Message text="Hi There">
      <Section>
      <Text type="mrkdwn">{formatJsonObject(person)}</Text>
      </Section>
    </Message>
  );
}
