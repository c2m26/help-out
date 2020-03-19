import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { getByTestId, fireEvent } from '@testing-library/dom'
import Conversation from './Conversation'

// beforeAll(() => {
//   global.fetch = jest.fn();
//   //window.fetch = jest.fn(); if running browser environment
// });

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

  const component = Conversation.WrappedComponent
  const creatorID = 1;
  const helperID = 3;
  const creatorName = "John";
  const helperName = "José";
  const user = {
    email: "jestebes@mail.com",
    firstName: "José",
    id: 3,
    lastName: "Estebes"
  }
  const match = {params: {id: 28}};

  const conversationIdData = 18;

it("renders conversation", async () => {

  global.fetch = jest.fn();
  
  const messagesData = [
    {
      id: 35,
      conversationID: 18,
      senderID: 3,
      content: "Hellooooo!",
      created_at: "2020-03-05T11:16:05.556Z",
      updated_at: "2020-03-05T11:16:05.556Z",
      
    },
    {
      id: 67,
      conversationID: 18,
      senderID: 1,
      content: "Hellooooo!",
      created_at: "2020-03-17T11:11:37.576Z",
      updated_at: "2020-03-17T11:11:37.576Z",
      
    },
    {
      id: 68,
      conversationID: 18,
      senderID: 1,
      content: "Hey, when can we do it?",
      created_at: "2020-03-17T11:11:43.699Z",
      updated_at: "2020-03-17T11:11:43.699Z",
      
    }
  ];
  
  const messages = jest.spyOn(component.prototype, 'getMessages')
  
  fetch.mockImplementation(() => 
    Promise.resolve({
      json: () => Promise.resolve(messagesData)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
          render(
            <Conversation.WrappedComponent
              creatorID = {creatorID}
              helperID= {helperID}
              creatorName= {creatorName}
              helperName={helperName}
              user={user}
              match={match}
            />,
            container
          );
  });

  const conversation = getByTestId(document, 'conversation');

  expect(messages).toHaveBeenCalled()
  
  for (let i =0; i<messagesData.length; i++){
    expect(conversation.innerHTML).toContain(messagesData[i].content)
  }
  
  // remove the mock to ensure tests are completely isolated
  messages.mockRestore();
  fetch.mockClear;

})

it("it calls handleSubmit method after user clicking 'send' button", () => {
  
  const messages = jest.spyOn(component.prototype, 'getMessages').mockImplementation(() => null);
  const conversationID = jest.spyOn(component.prototype, 'getConversationID').mockImplementation(() => null);
  
  const onSubmit = jest.spyOn(component.prototype, 'handleSubmit').mockImplementation(() => null);
  
  act(() => {
    render(
        <Conversation.WrappedComponent
          creatorID = {creatorID}
          helperID= {helperID}
          creatorName= {creatorName}
          helperName={helperName}
          user={user}
          match={match}
        />, 
        container
    )
  });
  
  act(() => {
    fireEvent.submit(getByTestId(document, 'submit'))
  });

  expect(component.prototype.handleSubmit).toHaveBeenCalled();

  onSubmit.mockRestore();
  messages.mockRestore();
  conversationID.mockRestore();
})

