import React from "react";
import { client } from "./server";
import { HelloGimmie } from "./hello-gimmie";
import { GimmieModal } from "./modal";
import gimmieData from "./data/gimmie.json";

import {
  Actions,
  Home,
  PheliaHomeProps,
  ImageBlock,
  Section,
  Text,
  Button,
  Option,
  SelectMenu
} from "phelia";

export function GimmieHome({useState, useModal, user}: PheliaHomeProps) {
  
  // Set up state
  const [config, setConfig] = useState("config", null);
  const [data, setData] = useState("data", null);
  
  
  // Set up select menu options
  const options = (
    <>
      {
      gimmieData.mocks && gimmieData.mocks.map((t: any, i) => (
        <Option key={i} value={t["gimmie-config"].name}>
          {t["gimmie-config"].name}
        </Option>)
        )}
    </>
  );

  // Method: Executed on change of select menu
  const menuItemSelected = function(ev:any) {
   let item = gimmieData.mocks.find(x => x["gimmie-config"].name === ev.selected);

   
    let cfg = item["gimmie-config"].fields;
    setConfig(cfg);
    
    let data = Object.assign({}, item);
    delete data["gimmie-config"];
    setData(data);
  };

  // Method: Executes on button click
  const buttonClick = function(ev: any, userId: string) {
    console.log(config)
    client.postMessage(HelloGimmie, userId, data);
  }
  
  // Method: Prints the Result
  const printResult = function(formData: Object, userId: string) {
    let result = { ...data, ...formData}
    client.postMessage(HelloGimmie, userId, result);
  }

  // Method: Opens the modal
  const openModal = useModal(
    "modal",
    GimmieModal,
    event => printResult(event.form, event.user.id),
    () => console.log("cancelled"),
  );

  // The Home Component
  return (
    <Home>
      <ImageBlock 
          emoji
          alt="Hey There!"
          imageUrl="https://i.ibb.co/1sKxnWv/gimmie-home.png" />
      <Section>
        <Text emoji>Looking good {user.username}! :green_heart:</Text>
      </Section>
      <Section
        text={"Select a JSON Sample:"}
        accessory={
          <SelectMenu
          action="select-sample"
          type="static"
          placeholder="Select a JSON snippet to serve"
          onSelect={event => menuItemSelected(event)}
          >
            {options}
        </SelectMenu>
        }
      />
      { data && (
        <>  
          <Actions>
            <Button style="primary" action="modal" onClick={(event) => openModal({config: config})}>
              Gimmie
            </Button>
          </Actions>
        </>
      )}
    </Home>
  );
}