import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Login from './Login'


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

it("it calls handleSubmit method after user clicking 'sign in' button", () => {
  const component = Login.WrappedComponent
  
  const onSubmit = jest.spyOn(component.prototype, 'handleSubmit');
  
  act(() => {
    render(
          <Login.WrappedComponent/>
          , 
          container
    )
  });
  
  const submitButton = document.querySelector("[type='submit']");
  
  act(() => {
    submitButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(component.prototype.handleSubmit).toHaveBeenCalled();

  onSubmit.mockRestore();
})