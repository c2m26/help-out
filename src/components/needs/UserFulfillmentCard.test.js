import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { getByTestId } from '@testing-library/dom';
import UserFulfillmentCard from './UserNeedCard'
import { BrowserRouter } from 'react-router-dom';


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

const testContent = {
  created_at: "2020-03-04T16:22:40.256Z",
  description: "gggag",
  formattedAddress: "Marbachweg 239, 60320 Frankfurt am Main",
  fulfillmentID: 27,
  id: 10,
  lat: 50.1419606,
  lng: 8.6833312,
  needType: "oneTime",
  status: "closed",
  title: "Change lamp",
  updated_at: "2020-03-04T17:12:12.235Z",
  userID: 3
}

it("renders the content according to props passed", () =>{
  
  jest.spyOn(UserFulfillmentCard.prototype, 'getHelpersID').mockImplementation(() =>{})

  act(() => {
    render(
          <BrowserRouter>
            <UserFulfillmentCard
              data={testContent}
            />
          </BrowserRouter>
          ,
          container
        
    )
  });

  expect(container.textContent).toContain(testContent.title)
  expect(container.textContent).toContain(testContent.formattedAddress)
  expect(container.textContent).toContain("one time")
  expect(container.textContent).toContain("Fulfilled")

  // remove the mock to ensure tests are completely isolated
  UserFulfillmentCard.prototype.getHelpersID.mockRestore();
})

it("handles correctly css class changes on mouseenter and mouseleave", () => {
  
  jest.spyOn(UserFulfillmentCard.prototype, 'getHelpersID').mockImplementation(() =>{})

  act(() => {
    render(
          <BrowserRouter>
            <UserFulfillmentCard
              data={testContent}
            />
          </BrowserRouter>
          ,
          container
    )
  });

  const card = getByTestId(document, 'card');
  const control = card.innerHTML.length;
  const target = document.getElementById(testContent.id+"R");
  
  act(() => {
    target.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
  });

  expect(card.innerHTML.length).toBeGreaterThan(control)

  act(() => {
    target.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
  });

    expect(card.innerHTML.length).toEqual(control)

  // remove the mock to ensure tests are completely isolated
  UserFulfillmentCard.prototype.getHelpersID.mockRestore();

})


it("it calls handleFulfilled method after user clicking 'Fulfill' button", () => {

  jest.spyOn(UserFulfillmentCard.prototype, 'getHelpersID').mockImplementation(() => {})
  const fulfill = jest.spyOn(UserFulfillmentCard.prototype, 'handleFulfilled');
  
  act(() => {
    render(
          <UserFulfillmentCard
            data={testContent}
          />
          , 
          container
    )
  });
  
  const fulfillButton = getByTestId(document, 'fulfillButton');
  
  act(() => {
    fulfillButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(UserFulfillmentCard.prototype.handleFulfilled).toHaveBeenCalled();

  // remove the mock to ensure tests are completely isolated
  UserFulfillmentCard.prototype.getHelpersID.mockRestore();
  fulfill.mockRestore();
  
})



