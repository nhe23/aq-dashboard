<script lang="ts">
  import MeasurementsList from "./MeasurementsList.svelte";
  import Filter from "./Filter/Filter.svelte"
</script>

<style>
  .row {
    display: flex;
  }
</style>

<section class="section">
  <div class="container">
    <div class="row">
      <Filter />
      <MeasurementsList />
    </div>
  </div>
</section>
