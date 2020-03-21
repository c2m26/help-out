import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { getByTestId, fireEvent } from '@testing-library/dom'
import { NewNeed } from './NewNeed'


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

it("it calls geoCoding method after user clicking 'submit' button", () => {
  const component = NewNeed.prototype
  
  const onSubmit = jest.spyOn(component, 'handleGeocoding').mockImplementation(() => null);
  
  act(() => {
    render(
          <NewNeed
          postNeed={()=>null}
          need={{need: 0}}
          user={{id: 1}}
          />
          , 
          container
    )
  });
  
  // const submitButton = getByTestId(document, 'submit');
  
  act(() => {
    fireEvent.submit(getByTestId(document, 'submit'))
  });

  expect(component.handleGeocoding).toHaveBeenCalled();

  onSubmit.mockRestore();
})