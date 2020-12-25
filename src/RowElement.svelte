<script lang="ts">
  export let result;
</script>

<style>
  .column{
    display:grid;
    /* place-items: center; */
  }

  .container {
    border-bottom: 1px solid;
    padding: 10px;
  }
</style>

<div class="container">
  <div class="columns">
    <div class="column is-2"><span>{result.location}</span></div>
    <div class="column is-2 "><span>{result.city}</span></div>
    <div class="column is-2 "><span>{result.country}</span></div>
    <div class="column is-1 "><span>{result.parameter}</span></div>
    <div class="column is-2 "><span>{result.value}{result.unit}</span></div>
    <div class="column is-3 "><span>{result.coordinates}</span></div>
  </div>
</div>

