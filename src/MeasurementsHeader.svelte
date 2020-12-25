<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Columns } from "./interfaces";
  export let measurmentsKeys: Array<Columns>;

  const dispatch = createEventDispatcher();

  function sort(key) {
    dispatch("sort", {
      key,
    });
  }
</script>

<style>
  .column {
    display: grid;
    /* place-items: center; */
  }

  .headerBox {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  .headerField {
    display: flex;
    align-items: center;
  }

  .icon {
    cursor: pointer;
  }
</style>

<div class="box headerBox">
  <div class="columns">
    {#each measurmentsKeys as header}
      <div class="column is-2 is-flex is-flex-direction-column">
        {#each header.keys as key}
          <div class="headerField">
            <span>{key.name}</span>
            <span
              class="icon is-small has-text-primary sortIcon"
              on:click={() => sort(key.internalName)}>
              <i class="fas fa-sort" />
            </span>
          </div>
        {/each}
      </div>
    {/each}
    <!-- <div class="column is-2 headerField">
      <span>Location</span>
      <span class="icon is-small has-text-primary sortIcon" on:click={() => sort("location")}>
        <i class="fas fa-sort" />
      </span>
    </div>
    <div class="column is-2 headerField">
      <span>City</span><span class="icon is-small has-text-primary sortIcon">
        <i class="fas fa-sort" />
      </span>
    </div>
    <div class="column is-2 headerField">
      <span>Country</span><span class="icon is-small has-text-primary sortIcon">
        <i class="fas fa-sort" />
      </span>
    </div>
    <div class="column is-2 headerField">
      <span>Parameter</span><span
        class="icon is-small has-text-primary sortIcon">
        <i class="fas fa-sort" />
      </span>
    </div>
    <div class="column is-2 headerField">
      <span>Value</span><span class="icon is-small has-text-primary sortIcon">
        <i class="fas fa-sort" />
      </span>
    </div>
    <div class="column is-2 is-flex is-flex-direction-column">
      <div class="headerField">
        <span>Longitude</span><span
          class="icon is-small has-text-primary sortIcon">
          <i class="fas fa-sort" />
        </span>
      </div>
      <div class="headerField">
        <span>Latitude</span><span
          class="icon is-small has-text-primary sortIcon">
          <i class="fas fa-sort" />
        </span>
      </div>
    </div> -->
  </div>
</div>
