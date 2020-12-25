<script lang="ts">
  import gql from "graphql-tag";
  import { client } from "./apollo";
  import { query } from "svelte-apollo";
  import { onMount } from "svelte";
  import type { Columns } from "./interfaces";
  import Measurement from "./Measurement.svelte";
  import MeasurementsHeader from "./MeasurementsHeader.svelte";

  let results: Array<any> = [];
  let error: Error;
  let loading = true;
  let after = "";

  let measurmentsKeys: Array<Columns> = [
    {
      sizeClass: "is-2",
      keys: [{ sortedDesc: false, name: "Location", internalName: "location" }],
    },
    {
      sizeClass: "is-2",
      keys: [{ sortedDesc: false, name: "City", internalName: "city" }],
    },
    {
      sizeClass: "is-2",
      keys: [{ sortedDesc: false, name: "Country", internalName: "country" }],
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
    // {
    //   sizeClass: "is-2",
    //   keys: [{ sortedDesc: false, name: "Updated", internalName: "lastUpdated" }],
    // },
  ];
  // restore(client, AUTHOR_LIST, authorCache.data);
  const LOCATION_RESULTS = gql`
    query($after: String!) {
      locationResults(take: 2, after: $after) {
        _id
        location
        city
        country
        measurements {
          parameter
          value
          lastUpdated
          unit
        }
        coordinates {
          latitude
          longitude
        }
      }
    }
  `;

  let curRes = [];
  $: results = curRes;

  async function fetch() {
    try {
      const locationResults = query(client, {
        query: LOCATION_RESULTS,
        variables: { after },
      });
      let res = await locationResults.result();
      let locResult = res.data.locationResults;
      let newResults: any[] = [];
      for (let locRes of locResult) {
        console.log(locRes.measurements);
        newResults = [
          ...newResults,
          ...locRes.measurements.map((m) => {
            return {
              _id: locRes._id,
              country: locRes.country,
              location: locRes.location,
              city: locRes.city,
              longitude: locRes.coordinates.longitude,
              latitude: locRes.coordinates.latitude,
              parameter: m.parameter,
              value: m.value,
              lastUpdate: m.lastUpdate,
              unit: m.unit,
            };
          }),
        ];
      }
      curRes = [...results, ...newResults];
      after = newResults[newResults.length - 1]._id;
    } catch (e) {
      error = e;
      throw e;
    }
    loading = false;
  }

  onMount(async () => {
    await fetch();
  });

  const handleScroll = async (e) => {
    if (
      document.documentElement.scrollTop + window.innerHeight >=
      document.documentElement.scrollHeight - 20
    ) {
      console.log("fetching");
      await fetch();
    }
  };

  const sortByKey = (event: any) => {
    const key = event.detail.key;
    console.log(key);
    let sortedDesc:boolean;
    for (let i=0; i < measurmentsKeys.length;i++) {
      let found = false;
      let measurementKey = measurmentsKeys[i].keys
      for (let j=0; j < measurementKey.length; j++) {
        let k = measurementKey[j]
        if (k.internalName === key) {
          sortedDesc = k.sortedDesc;
          k.sortedDesc = !k.sortedDesc;
          found = true;
          break;
        }
      }
      if (found) break;
    }
    console.log(curRes);
    results = curRes.sort((a, b) => {
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
      }
      return returnValue;
    });
    sortedDesc = !sortedDesc;
    console.log(curRes);
  };
</script>

<style>
</style>

<svelte:window on:scroll={handleScroll} />

<ul>
  {#if loading}
    <li>Loading...</li>
  {:else if error}
    <li>Error loading authors: {error}</li>
  {:else}
    <section class="section">
      <div class="container">
        <MeasurementsHeader {measurmentsKeys} on:sort={sortByKey} />
        {#each results as result}
          <li>
            <Measurement {result} />
          </li>
        {:else}
          <li>No authors found</li>
        {/each}
      </div>
    </section>
  {/if}
</ul>
