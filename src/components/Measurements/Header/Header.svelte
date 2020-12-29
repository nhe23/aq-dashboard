<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Columns } from "../../../types";
  import SortDesktop from "./SortDesktop.svelte";
  import SortMobile from "./SortMobile.svelte";
  export let measurmentsKeys: Array<Columns>;
  let w;

  const dispatch = createEventDispatcher();

  function sort(key: string) {
    dispatch("sort", {
      key,
    });
  }
</script>

<style>
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
  <div class="hidden-mobile">
    <SortDesktop {measurmentsKeys} {sort} />
  </div>
  <div class="hidden-desktop">
    <SortMobile {measurmentsKeys} {sort} />
  </div>
</div>
