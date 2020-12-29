<script lang="ts">
  import type { Columns } from "../../../types";
  export let measurmentsKeys: Array<Columns>;
  export let sort: (key: string) => void;

  let showTags = false;

  function toogleTags() {
    showTags = !showTags;
  }
</script>

<style>
  .tag {
    margin: 5px;
    cursor: pointer;
  }

  .headerField {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .headerText{
    margin-right: 5px
  }
</style>

<div on:click={toogleTags} class="headerField">
  <div class="headerText">Sort by</div>
  {#if showTags}
    <span class="icon is-small has-text-primary sortIcon">
      <i class="fas fa-chevron-up" />
    </span>
  {:else}
    <span class="icon is-small has-text-primary sortIcon"><i
        class="fas fa-chevron-down" /></span>
  {/if}
</div>
{#if showTags}
  <div class="is-flex is-flex-wrap-wrap">
    {#each measurmentsKeys as header}
      {#each header.keys as key}
        <div class="headerField tag" on:click={() => sort(key.internalName)}>
          <span>{key.name}</span>
          <span class="icon is-small has-text-primary sortIcon">
            <i class="fas fa-sort" />
          </span>
        </div>
      {/each}
    {/each}
  </div>
{/if}
