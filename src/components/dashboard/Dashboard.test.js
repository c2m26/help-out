import React from 'react'

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { getByTestId } from '@testing-library/dom'

import MockedNeedsList from '../needs/NeedsList'
import MockedMap from '../general/map/Map'
import { Dashboard } from './Dashboard'


jest.mock("../needs/NeedsList", ()=> {
  return function DummyNeedsList (props) {
    return(
      <div data-testid="needsList">
        Needs List
      </div>
    );
  };
});

jest.mock("../general/map/Map", ()=> {
  return function DummyMap (props) {
    return(
      <div data-testid="map">
        Map
      </div>
    );
  };
});


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

const sampleNeed = [
  {
  id: 14,
  userID: 1,
  title: "New Need Again",
  description: "adsadsad",
  needType: "material",
  lat: 50.1429351,
  lng: 8.6874011,
  formattedAddress: "Marbachweg 209, 60435 Frankfurt am Main",
  status: "open",
  created_at: "2020-03-05T11:14:36.973Z",
  updated_at: "2020-03-05T11:14:36.973Z"
  }
]

it("renders child components", () => {

  const component = Dashboard.prototype
  
  const getFulfillments = jest.spyOn(component, 'getFulfillments').mockImplementation(() => null);
  
  act(() => {
    render(
          <Dashboard
            getUserLocation={() => null}
            userLocation={{lat:0, lng:0}}
            fetchNeeds = {() => null}
            needs = {sampleNeed}
          />
          , 
          container
    )
  });
  
  const listContent = getByTestId(document, 'needsList');
  const mapContent = getByTestId(document, 'map');

  expect(listContent.textContent).toContain("Needs List");
  expect(mapContent.textContent).toContain("Loading map...");

  getFulfillments.mockRestore();
})