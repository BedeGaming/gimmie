import React from "react";

import {
  Message,
  PheliaMessageProps,
  Section,
  Text
} from "phelia";

export function HelloGimmie ({ props }: PheliaMessageProps) {
  function formatJsonObject(obj: Object) {
    return "```\n" + 
            JSON.stringify(obj, null, 2)+
          "\n```";
  }

  return (
    <Message text="Here you go!">
      <Section>
      <Text type="mrkdwn">{formatJsonObject(props)}</Text>
      </Section>
    </Message>
  );
}
