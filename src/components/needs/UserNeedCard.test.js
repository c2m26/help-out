import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { getByTestId } from '@testing-library/dom';
import UserNeedCard from './UserNeedCard'
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
  id: 13,
  userID: 1,
  title: "Change lamp",
  description: "aasdsadsads",
  needType: "oneTime",
  lat: 50.1419606,
  lng: 8.6833312,
  formattedAddress: "Marbachweg 229, 60320 Frankfurt am Main",
  status: "open",
  created_at: "2020-03-05T09:45:23.013Z",
  updated_at: "2020-03-05T09:45:23.013Z",
  republish: true
}

const testFulfillments = [
  [{
  created_at: "2020-03-05T11:16:47.406Z",
  helperID: 3,
  id: 29,
  needID: 13,
  updated_at: "2020-03-05T11:16:47.406Z"
}]
]

it("renders the content according to props passed", () =>{
  
  jest.spyOn(UserNeedCard.prototype, 'getHelpersID').mockImplementation(() =>{})

  act(() => {
    render(
          <BrowserRouter>
            <UserNeedCard
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
  expect(container.textContent).toContain("Republish")

  // remove the mock to ensure tests are completely isolated
  UserNeedCard.prototype.getHelpersID.mockRestore();
})

it("handles correctly css class changes on mouseenter and mouseleave", () => {
  
  jest.spyOn(UserNeedCard.prototype, 'getHelpersID').mockImplementation(() =>{})

  act(() => {
    render(
          <BrowserRouter>
            <UserNeedCard
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
  UserNeedCard.prototype.getHelpersID.mockRestore();

})

it("renders button with id of Helper", () => {

  act(() => {
    render(
          <BrowserRouter>
            <UserNeedCard
              data={testContent}
              fulfillments={testFulfillments}
            />
          </BrowserRouter>
          ,
          container
    )
  });

  const card = getByTestId(document, 'card');
  const target = getByTestId(card, 'helperButton');
  
  expect(target.textContent).toContain("Helper 3")
})


it("it calls handleFulfilled method after user clicking 'Fulfill' button", () => {

  jest.spyOn(UserNeedCard.prototype, 'getHelpersID').mockImplementation(() => {})
  const fulfill = jest.spyOn(UserNeedCard.prototype, 'handleFulfilled');
  
  act(() => {
    render(
          <UserNeedCard
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

  expect(UserNeedCard.prototype.handleFulfilled).toHaveBeenCalled();

  // remove the mock to ensure tests are completely isolated
  UserNeedCard.prototype.getHelpersID.mockRestore();
  fulfill.mockRestore();
  
})

it("it calls handleRepublish method after user clicking 'Republish' button", () => {

  jest.spyOn(UserNeedCard.prototype, 'getHelpersID').mockImplementation(() => {})
  const republish = jest.spyOn(UserNeedCard.prototype, 'handleRepublish');
  
  act(() => {
    render(
          <UserNeedCard
          data={testContent}
          />
          , 
          container
    )
  });
  
  const republishButton = getByTestId(document, 'republish');
  
  act(() => {
    republishButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(UserNeedCard.prototype.handleRepublish).toHaveBeenCalled();

  // remove the mock to ensure tests are completely isolated
  UserNeedCard.prototype.getHelpersID.mockRestore();
  republish.mockRestore();
  
})



