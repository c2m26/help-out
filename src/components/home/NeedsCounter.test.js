import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import NeedsCounter from './NeedsCounter'

jest.useFakeTimers();

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

it("renders the number of open help requests", async () => {
  const fakeOpenNeeds = [{id:1},{id:2},{id:2},{id:2},{id:2}];

  jest.spyOn(global, "fetch").mockImplementation(()=>
    Promise.resolve({
      json: () => Promise.resolve(fakeOpenNeeds)
    })
  );
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<NeedsCounter/>, container);
  });

  expect(parseInt(container.innerHTML)).toBe(5)

  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(parseInt(container.innerHTML)).toBe(5)
  
  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
})