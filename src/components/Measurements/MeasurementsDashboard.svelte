<script lang="ts">
  import MeasurementsList from "./MeasurementsList.svelte";
  import FilterDesktop from "./Filter/FilterDesktop.svelte"
</script>

<style>
  .row {
    display: flex;
  }
</style>

<section class="section">
  <div class="container">
    <div class="row">
      <FilterDesktop />
      <MeasurementsList />
    </div>
  </div>
</section>
