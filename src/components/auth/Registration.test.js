import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { getByTestId, fireEvent } from '@testing-library/dom'
import Registration from './Registration'


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
  const component = Registration.WrappedComponent
  
  const onSubmit = jest.spyOn(component.prototype, 'handleSubmit').mockImplementation(() => null);
  
  act(() => {
    render(
          <Registration.WrappedComponent/>
          , 
          container
    )
  });
  
  const submitButton = getByTestId(document, 'submit');
  
  act(() => {
    fireEvent.submit(getByTestId(document, 'submit'))
  });

  expect(component.prototype.handleSubmit).toHaveBeenCalled();

  onSubmit.mockRestore();
})