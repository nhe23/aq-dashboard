<script lang="ts">
  import { onMount } from "svelte";
  import { client } from "../../../apollo";
  import { query } from "svelte-apollo";
  import { filterStore, filterDefault } from "../../../store";
  import type { Countries, Country } from "../../../types";
  import { COUNTRIES } from "../queries";

  let initialSelected = { name: "All", code: "xx" };
  let selected = initialSelected;
  let showCountries = false;

  let error: Error;
  let loading: boolean;
  let queryCountries = [];

  function select(result: Country) {
    selected = result;
    if (result.name !== "All")
      filterStore.set({ key: "country", value: selected.code });
    else filterStore.set(filterDefault);
    showCountries = false;
  }

  async function fetchCountries() {
    try {
      loading=true;
      const countriesResult = query(client, {
        query: COUNTRIES,
      });
      let res: Countries = await countriesResult.result();
      queryCountries = [initialSelected, ...res.data.countries];
    } catch (e) {
      error = e;
    }
    loading = false;
  }

  onMount(async () => {
    await fetchCountries();
  });

  filterStore.subscribe((f) => {
    if (f.key !== "country") {
      selected = initialSelected;
    }
  });
</script>

<style>
  .dropdown-trigger {
    width: 100%;
  }

  .button {
    width: 100%;
  }
  .dropdown-content {
    max-height: 250px;
    overflow-y: scroll;
  }

  .selectable {
    cursor: pointer;
  }

  .countrySelectLabel {
    width: 190px;
    overflow: hidden;
  }
</style>

<div
  class="dropdown header"
  class:is-active={showCountries}
  data-testid="filterCountries">
  <div class="dropdown-trigger">
    <button
      class="button is-link"
      aria-haspopup="true"
      aria-controls="dropdown-menu-countries"
      data-testid="filterCountriesButton"
      on:click={() => {
        showCountries = !showCountries;
      }}>
      <span class="countrySelectLabel">{selected.name}</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu-countries" role="menu">
    <div class="dropdown-content" data-testid="countriesDropdownContent">
      {#if loading}
        Loading...
      {:else if error}
        {`Error loading countries: ${error.message}`}
      {:else}
        {#each queryCountries as result, i}
          <div
            class="dropdown-item selectable"
            on:click={() => select(result)}
            data-testid="country{i}">
            {result.name}
          </div>
        {:else}
          <div class="dropdown-item">No countries found</div>
        {/each}
      {/if}
    </div>
  </div>
</div>
