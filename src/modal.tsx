import React from "react";

import {
  DatePicker,
  Input,
  Modal,
  PheliaModalProps,
  TextField
} from "phelia";

export function GimmieModal({ props }: PheliaModalProps) {

  const textFields = (
    <>
      {
        props.config && Object.keys(props.config).map((t: any, i) => (
          <>
          { props.config[t].type === "string" && 
            <Input key={i} label={t}>
              <TextField key={i} action={t} initialValue={props.config[t].default}></TextField>
            </Input>
          }
          { props.config[t].type === "date" && 
            <Input key={i} label={t}>
              <DatePicker action={t} initialDate={props.config[t].default}></DatePicker>
            </Input>
          }
          </>
        ))}
    </>
  );

  return (
    <Modal title="Data Editor" submit="Gimmie!">
      {textFields}
    </Modal>
  );
}