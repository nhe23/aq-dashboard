<script lang="ts">
  export let result;
</script>

<style>
  .column {
    display: grid;
    /* place-items: center; */
  }

  .container {
    padding: 10px;
    border-bottom: 1px solid;
    margin-left: 10px;
    margin-right: 10px;
  }

</style>

<div class="container">
  <div class="columns">
    <div class="column is-2"><span>{result.location}</span></div>
    <div class="column is-2 "><span>{result.city}</span></div>
    <div class="column is-2 "><span>{result.country}</span></div>
    <div class="column is-2 "><span>{result.parameter}</span></div>
    <div class="column is-2 "><span>{result.value}{result.unit}</span></div>
    <div class="column is-2 is-flex is-flex-direction-column">
      <span>{result.longitude}</span>
      <span>{result.latitude}</span>
    </div>
  </div>
</div>
