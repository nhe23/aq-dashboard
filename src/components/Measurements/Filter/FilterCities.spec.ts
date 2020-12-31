import fetchMock from "jest-fetch-mock";
import { mocked } from "ts-jest/utils";
import { query } from "svelte-apollo";

import FilterCities from "./FilterCities.svelte";
import { render, fireEvent } from "@testing-library/svelte";
import { resolveFieldValueOrError } from "graphql/execution/execute";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

jest.mock("svelte-apollo");
const mockedQuery = mocked(query, true);

beforeAll(() => {
  fetchMock.enableMocks();
});

it("should render filter and sort components", async () => {
  // @ts-ignore
  mockedQuery.mockReturnValue({result: () => {
      return {
        data: {
          citiesStartsWith: [{
            name: "Paris",
          }],
        },
      };
    },
  });
  const { getByTestId, component } = render(FilterCities);
  let filterCities = getByTestId("filterCities");
  const input = getByTestId("searchCities");
  expect(
    filterCities.querySelector('div[data-testid="citiesDropdownContent"]')
  ).not.toBe(null);

  await fireEvent.focus(input);
  await fireEvent.input(input, { target: { value: "Par" } });

  //Sleep because input is debounced
  await sleep(1000);
  let firstChild = filterCities.firstChild as HTMLElement;
  expect(mockedQuery).toHaveBeenCalled();
});

it("should dispatch sort event", async () => {});
