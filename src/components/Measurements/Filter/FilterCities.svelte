<script lang="ts">
  import gql from "graphql-tag";
  import { client } from "../../../apollo";
  import { query } from "svelte-apollo";
  import { debounceInput } from "../../../actions/debounceInput";
  import { filterStore } from "../../../store";

  let showCities = false;
  let placeholder = "Search for city";
  let error: Error;
  let loading = false;
  let queryCities = [];
  let searchString = "";
  let inputValue: string;

  const CITIES_STARTWITH = gql`
    query($searchString: String!) {
      citiesStartsWith(searchString: $searchString) {
        name
      }
    }
  `;

  async function handleNewValue(e) {
    searchString = e.detail;
    await fetchCities(searchString);
  }

  function select(e: Event, result) {
    inputValue = result.name;
    filterStore.set({ key: "city", value: inputValue });
    showCities = false;
  }

  async function fetchCities(searchString: string) {
    console.log("fetching");
    console.log(searchString);
    try {
      const citiesResult = query(client, {
        query: CITIES_STARTWITH,
        variables: { searchString },
      });
      let res = await citiesResult.result();
      queryCities = res.data.citiesStartsWith;
    } catch (e) {
      error = e;
    }
    loading = false;
  }

  filterStore.subscribe((f) => {
    if (f.key !== "city") {
      inputValue = "";
      searchString = "";
    }
  });
</script>

<style>
  .selectable {
    cursor: pointer;
  }

  .citiesInput {
    width: 243px;
  }
</style>

<div
  class="dropdown header"
  class:is-active={showCities && searchString !== ''}>
  <div class="dropdown-trigger">
    <div class="field">
      <div class="control">
        <input
          on:focus={() => {
            showCities = true;
          }}
          use:debounceInput
          class="input citiesInput"
          type="text"
          {placeholder}
          on:newvalue={handleNewValue}
          bind:value={inputValue} />
      </div>
    </div>
  </div>
  <div class="dropdown-menu" id="dropdown-menu3" role="menu">
    <div class="dropdown-content citiesInput">
      {#if loading}
        Loading...
      {:else if error}
        Error loading countries:
        {error}
      {:else}
        {#each queryCities as result}
          <div
            class="dropdown-item selectable"
            on:click={(e) => select(e, result)}>
            {result.name}
          </div>
        {:else}
          <div class="dropdown-item">No cities found</div>
        {/each}
      {/if}
    </div>
  </div>
</div>
