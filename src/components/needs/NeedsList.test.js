import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import NeedsList from './NeedsList'


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


it("renders the NeedsList content", () =>{
  const testContent = "Test Content"
  act(() => {
    render(
          <NeedsList
          content={testContent}
          />
          ,
          container
    )
  });
  expect(container.textContent).toContain(testContent)
})

