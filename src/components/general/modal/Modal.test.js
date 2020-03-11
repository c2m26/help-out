import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Modal from './Modal'


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  container.setAttribute('id', 'modal');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("renders the modal content", () =>{
  const testContent = "Test Content"
  act(() => {
    render(
          <Modal.WrappedComponent
          content={testContent}
          />
          ,
          container
    )
  });
  expect(container.textContent).toContain(testContent)
})

