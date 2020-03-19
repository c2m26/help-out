import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { getByTestId, fireEvent } from '@testing-library/dom';
import Fulfillment from './Fulfillment';
import MockedConversation from "./Conversation";

jest.mock("./Conversation", ()=> {
  return function DummyConversation () {
    return(
      <div>"Conversation Block"</div>
    );
  };
});

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("renders need data and conversation component", async () => {

global.fetch = jest.fn();

const needData = {
  id: 14,
  userID: 1,
  title: "New Need Again",
  description: "adsadsad",
  needType: "material",
  lat: 50.1429351,
  lng: 8.6874011,
  formattedAddress: "Marbachweg 209, 60435 Frankfurt am Main",
  status: "open",
  created_at: "2020-03-05T11:14:36.973Z",
  updated_at: "2020-03-05T11:14:36.973Z"
}

const getFulfillmentforeignKeys = jest.spyOn(Fulfillment.prototype, 'getFulfillmentforeignKeys').mockImplementation(() => null);
const getNeedCreatorId = jest.spyOn(Fulfillment.prototype, 'getNeedCreatorId').mockImplementation(() => null);
const getUsersName = jest.spyOn(Fulfillment.prototype, 'getUsersName').mockImplementation(() => null);
const checkUserAccess = jest.spyOn(Fulfillment.prototype, 'checkUserAccess').mockImplementation(() => null);

fetch.mockImplementation(() => 
    Promise.resolve({
      json: () => Promise.resolve(needData)
    })
  );

  await act(async () => {
          render(
            <Fulfillment/>,
            container
          );
        });

  const block = getByTestId(document, 'need');
  const conversation = getByTestId(document, 'conversation');
  // console.log(block.innerHTML)
  expect(block.innerHTML).toContain(needData.title);
  expect(block.innerHTML).toContain(needData.description);
  expect(block.innerHTML).toContain(needData.formattedAddress);
  expect(conversation.innerHTML).toContain("Conversation Block");

// remove the mock to ensure tests are completely isolated
getFulfillmentforeignKeys.mockRestore();
getNeedCreatorId.mockRestore();
getUsersName.mockRestore();
checkUserAccess.mockRestore();
fetch.mockClear;

})