import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { getByTestId } from '@testing-library/react'
import NeedCard from './NeedCard'
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
  updated_at: "2020-03-05T09:45:23.013Z"
}

it("renders the content according to props passed", () =>{
  act(() => {
    render(
        <BrowserRouter>
          <NeedCard
          need={testContent}
          />
        </BrowserRouter>
        ,
        container
    )
  });

  expect(container.querySelector('[class="card-title"]').innerHTML).toContain(testContent.title)
  expect(container.textContent).toContain("one time")
})

it("adds handles correctly css class chnages on mouseenter and mouseleave", () => {
  
  jest.spyOn(NeedCard.prototype, "handleCardId").mockImplementation(() => null)
  jest.spyOn(NeedCard.prototype, "handleRemoveMarker").mockImplementation(() => null)
  
  act(() => {
    render(
        <BrowserRouter>
          <NeedCard
          need={testContent}
          />
        </BrowserRouter>
        ,
        container
    )
  });

  const card = getByTestId(document, 'card');
  const control = card.innerHTML.length;
  const target = document.getElementById(testContent.id);
  
  act(() => {
    target.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
  });

  expect(NeedCard.prototype.handleCardId).toHaveBeenCalled();
  expect(card.innerHTML.length).toBeGreaterThan(control)

  // remove the mock to ensure tests are completely isolated
  NeedCard.prototype.handleCardId.mockRestore();

  act(() => {
    target.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
  });

  expect(NeedCard.prototype.handleRemoveMarker).toHaveBeenCalled();
  expect(card.innerHTML.length).toEqual(control)


  // remove the mock to ensure tests are completely isolated
  NeedCard.prototype.handleRemoveMarker.mockRestore();
})

