<script lang="ts">
  import { client } from "../../apollo";
  import { query } from "svelte-apollo";
  import { onMount } from "svelte";
  import type { Columns } from "../../types";
  import Measurement from "./Measurement.svelte";
  import MeasurementsHeader from "./Header/Header.svelte";
  import { filterStore } from "../../store";
  import type { IFilter } from "../../store";
  import {
    LOCATION_RESULTS,
    LOCATION_RESULTS_CITY,
    LOCATION_RESULTS_COUNTRY,
  } from "./queries";

  // let results: Array<any> = [];
  let error: Error;
  let loading = false;
  let after = "";
  let fetching = false;
  let reachedEndResult = false;

  let measurmentsKeys: Array<Columns> = [
    {
      sizeClass: "is-2",
      keys: [{ sortedDesc: false, name: "Location", internalName: "location" }],
    },
    {
      sizeClass: "is-2",
      keys: [
        { sortedDesc: false, name: "City", internalName: "city" },
        { sortedDesc: false, name: "Country", internalName: "country" },
      ],
    },
    {
      sizeClass: "is-2",
      keys: [
        { sortedDesc: false, name: "Parameter", internalName: "parameter" },
      ],
    },
    {
      sizeClass: "is-2",
      keys: [{ sortedDesc: false, name: "Value", internalName: "value" }],
    },
    {
      sizeClass: "is-2",
      keys: [
        { sortedDesc: false, name: "Longitude", internalName: "longitude" },
        { sortedDesc: false, name: "Latitude", internalName: "latitude" },
      ],
    },
    {
      sizeClass: "is-2",
      keys: [
        { sortedDesc: false, name: "Updated", internalName: "lastUpdated" },
      ],
    },
    // {
    //   sizeClass: "is-2",
    //   keys: [{ sortedDesc: false, name: "Updated", internalName: "lastUpdated" }],
    // },
  ];

  // restore(client, AUTHOR_LIST, authorCache.data);

  let results = [];

  function scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }

  function parseResults(locResults) {
    try {
      if (locResults.length === 0) {
        reachedEndResult = true;
        return;
      }
      let newResults: any[] = [];
      for (let locRes of locResults) {
        newResults = [
          ...newResults,
          ...locRes.measurements.map((m) => {
            return {
              _id: locRes._id,
              country: locRes.country.name,
              location: locRes.location,
              city: locRes.city,
              longitude: locRes.coordinates.longitude,
              latitude: locRes.coordinates.latitude,
              parameter: m.parameter,
              value: m.value,
              lastUpdated: m.lastUpdated,
              unit: m.unit,
              qualityIndex: m.qualityIndex,
            };
          }),
        ];
      }
      results = [...results, ...results, ...newResults];
      after = newResults[newResults.length - 1]._id;
    } catch (e) {
      error = e;
      throw e;
    }
    loading = false;
  }

  const handleScroll = async (e) => {
    if (
      document.documentElement.scrollTop + window.innerHeight >=
      document.documentElement.scrollHeight - 20
    ) {
      if (!fetching && !reachedEndResult) {
        fetching = true;
        await fetchResults($filterStore);
        fetching = false;
      }
    }
  };

  const sortByKey = (event: any) => {
    const key = event.detail.key;
    console.log(key);
    let sortedDesc: boolean;
    for (let i = 0; i < measurmentsKeys.length; i++) {
      let found = false;
      let measurementKey = measurmentsKeys[i].keys;
      for (let j = 0; j < measurementKey.length; j++) {
        let k = measurementKey[j];
        if (k.internalName === key) {
          sortedDesc = k.sortedDesc;
          k.sortedDesc = !k.sortedDesc;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    results = results.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      let returnValue = 0;
      if (typeof valueA === "string") {
        const nameA = valueA.toUpperCase();
        const nameB = valueB.toUpperCase();
        if (nameA < nameB) {
          returnValue = sortedDesc ? -1 : 1;
        } else if (nameA > nameB) {
          returnValue = sortedDesc ? 1 : -1;
        }
        return returnValue;
      } else if (typeof valueA === "number") {
        if (valueA < valueB) {
          returnValue = sortedDesc ? -1 : 1;
        } else if (valueA > valueB) {
          returnValue = sortedDesc ? 1 : -1;
        }
        return returnValue;
      } else if (valueA instanceof Date) {
        const dateASeconds = valueA.getTime();
        const dateBSeconds = valueB.getTime();
        return sortedDesc
          ? dateASeconds - dateBSeconds
          : dateBSeconds - dateASeconds;
      }
      return returnValue;
    });
    sortedDesc = !sortedDesc;
  };

  async function fetchResults(filter: IFilter) {
    let locationResultsQuery: any;
    let locationResults: any;
    let res: any;

    switch (filter.key) {
      case "country":
        console.log("country");
        console.log(filter.value);
        locationResultsQuery = query(client, {
          query: LOCATION_RESULTS_COUNTRY,
          variables: { country: filter.value, after },
        });
        res = await locationResultsQuery.result();
        locationResults = res.data.measurementsByCountry;
        break;
      case "city":
        console.log("city");
        locationResultsQuery = query(client, {
          query: LOCATION_RESULTS_CITY,
          variables: { city: filter.value, after },
        });
        res = await locationResultsQuery.result();
        locationResults = res.data.measurementsByCity;
        break;
      default:
        console.log("default");
        locationResultsQuery = query(client, {
          query: LOCATION_RESULTS,
          variables: { after },
        });
        res = await locationResultsQuery.result();
        locationResults = res.data.measurements;
    }
    parseResults(locationResults);
  }

  filterStore.subscribe(async (filter) => {
    console.log("new filter");
    results = [];
    loading = true;
    after = "";
    reachedEndResult = false;
    await fetchResults(filter);
  });
</script>

<style>
</style>

<svelte:window on:scroll={handleScroll} />

<div class="container">
  <MeasurementsHeader {measurmentsKeys} on:sort={sortByKey} />
  {#if loading}
    Loading...
  {:else if error}
    Error loading measurements:
    {error}
  {:else}
    {#each results as result}
      <Measurement {result} />
    {:else}No measurements found{/each}
  {/if}
</div>
