<script lang="ts">
  import { onMount } from "svelte";
  import gql from "graphql-tag";
  import { client } from "../../../apollo";
  import { query } from "svelte-apollo";
  import { filterStore } from "../../../store";

  let initialSelected = { name: "All", code: "xx" };
  let selected = initialSelected;
  let showCountries = false;

  let error;
  let loading;
  let queryCountries = [];

  const COUNTRIES = gql`
    query {
      countries {
        name
        code
      }
    }
  `;

  function select(result) {
    selected = result;
    filterStore.set({ key: "country", value: selected.code });
    showCountries = false;
  }

  async function fetchCountries() {
    try {
      const countriesResult = query(client, {
        query: COUNTRIES,
      });
      let res = await countriesResult.result();
      queryCountries = res.data.countries;
    } catch (e) {
      error = e;
      throw e;
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

<div class="dropdown header" class:is-active={showCountries}>
  <div class="dropdown-trigger">
    <button
      class="button"
      aria-haspopup="true"
      aria-controls="dropdown-menu-countries"
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
    <div class="dropdown-content">
      {#if loading}
        Loading...
      {:else if error}
        Error loading countries:
        {error}
      {:else}
        {#each queryCountries as result}
          <div class="dropdown-item selectable" on:click={() => select(result)}>
            {result.name}
          </div>
        {:else}
          <div class="dropdown-item">No countries found</div>
        {/each}
      {/if}
    </div>
  </div>
</div>
