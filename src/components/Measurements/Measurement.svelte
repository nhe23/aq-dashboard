<script lang="ts">
  export let result;
  let w;
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

  .box {
    margin-bottom: 15px;
  }
</style>

<div class="container hidden-mobile">
  <div class="columns">
    <div class="column is-2"><span>{result.location}</span></div>
    <div class="column is-2 is-flex is-flex-direction-column ">
      <span>{result.city}</span><span>{result.country}</span>
    </div>
    <div class="column is-2 "><span>{result.parameter}</span></div>
    <div class="column is-2 "><span>{result.value}{result.unit}</span></div>
    <div class="column is-2 is-flex is-flex-direction-column">
      <span>{result.longitude}</span>
      <span>{result.latitude}</span>
    </div>
    <div class="column is-2 "><span>{result.lastUpdated}</span></div>
  </div>
</div>

<div class="box hidden-desktop">
  <div class="is-size-4"><span>{result.location}</span></div>
  <div class="is-size-5">{result.city} in {result.country}</div>
  <div class="is-size-6">{result.parameter}: {result.value}{result.unit}</div>
  <div class="is-size-6">
    Longitude:
    {result.longitude}, Latitude
    {result.latitude}
  </div>
  <div class="is-size-6">Last updated {result.lastUpdated}</div>
</div>
