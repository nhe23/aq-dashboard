<script lang="ts">
  import type { Columns } from "../../../types";
  export let measurmentsKeys: Array<Columns>;
  export let sort: (key: string) => void;
</script>

<style>
  .column {
    display: grid;
    /* place-items: center; */
  }

  .headerField {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .headerBox {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  .box{
    background-color: #f5f5f5;
  }
</style>

<div class="box headerBox">
  <div class="container">
    <div class="columns">
      {#each measurmentsKeys as header}
        <div class="column is-2 is-flex is-flex-direction-column">
          {#each header.keys as key}
            <div class="headerField" on:click={() => sort(key.internalName)}>
              <span>{key.name}</span>
              <span class="icon is-small has-text-primary sortIcon">
                <i class="fas fa-sort" />
              </span>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
