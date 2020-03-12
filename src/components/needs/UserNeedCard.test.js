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
              // fulfillments={testFulfillments}
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
              // fulfillments={testFulfillments}
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

it("expands and collapses on click", () => {
  
  jest.spyOn(UserNeedCard.prototype, 'getHelpersID').mockImplementation(() => {})

  act(() => {
    render(
          <BrowserRouter>
            <UserNeedCard
              data={testContent}
              // fulfillments={testFulfillments}
            />
          </BrowserRouter>
          ,
          container
    )
  });

  const card = getByTestId(document, 'card');
  const target = document.getElementById(testContent.id+"R");
  
  //there is an issue with this event. it is on "acting" on the card
  act(() => {
    card.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // remove the mock to ensure tests are completely isolated
  UserNeedCard.prototype.getHelpersID.mockRestore();

  console.log(target.getAttribute('aria-expanded'))
  expect(target.getAttribute('aria-expanded')).toEqual("true")
  
  // add another click event to verify that card collapses and gos back to initial shape

  
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

