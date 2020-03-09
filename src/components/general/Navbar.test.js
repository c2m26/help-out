import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'


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

const fakeUser = {
  id: 3,
  firstName: "José",
  lastName: "Estebes"
}

it("renders without user signed in", () => {
  act(() => {
    render(<BrowserRouter>
              <Navbar
              loggedInStatus="NOT_LOGGED_IN"
              />
            </BrowserRouter>, 
            container)
  });
  expect(container.querySelector('[id="authblock"]').innerHTML).toBeTruthy()
  expect(container.querySelector('[id="navitems"]')).toBeNull()
  expect(container.textContent).toContain('Sign In');
  expect(container.textContent).toContain('Sign Up')
})

it("renders with user signed in", () => {
  act(() => {
    render(<BrowserRouter>
              <Navbar
              loggedInStatus='LOGGED_IN'
              user={fakeUser}
              />
            </BrowserRouter>, 
            container)
  });
  expect(container.querySelector('[id="navitems"]').innerHTML).toBeTruthy()
  expect(container.querySelector('[id="authblock"]')).toBeNull()
  expect(container.textContent).toContain(fakeUser.firstName);
})

it("renders the correct color scheme", () => {
  act(() => {
    render(<BrowserRouter>
              <Navbar
              navcolorscheme = "navbar-dark"
              navbg = "bg-transparent"
              />
            </BrowserRouter>, 
            container)
  });
  expect(document.querySelector('div').innerHTML).toContain('navbar-dark bg-transparent')
})
