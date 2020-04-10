import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { BrowserRouter } from 'react-router-dom'
import Hero from './Hero'


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

it("renders 'check them out' button when user is signed in", () => {
  act(() => {
    render(
          <BrowserRouter>
            <Hero
              loggedInStatus="LOGGED_IN"
            />
          </BrowserRouter>
          , 
          container
    )
  });
  expect(container.querySelector('[data-testid="conditionalLinkButton"]')).toBeTruthy();
  expect(container.querySelector('[data-testid="conditionalText"]')).toBeNull();
  expect(container.textContent).toContain('Check them out!');
})

it("does NOT render 'check them out' button when user is NOT signed in and renders conditional text", () => {
  act(() => {
    render(
          <BrowserRouter>
            <Hero
              loggedInStatus="NOT_LOGGED_IN"
            />
          </BrowserRouter>
          , 
          container
    )
  });
  expect(container.querySelector('[data-testid="conditionalLinkButton"]')).toBeNull();
  expect(container.querySelector('[data-testid="conditionalText"]').textContent).toContain('Help Out !');
})
