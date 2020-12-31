<script lang="ts">
  export let result;
</script>

<style>
  .column {
    display: grid;
  }

  .container {
    padding: 10px;
    border-bottom: 1px solid #f5f5f5;
    border-left: 1px solid #f5f5f5;
    border-top: 1px solid #f5f5f5;
    margin-left: 10px;
    margin-right: 10px;
  }

  .box {
    margin-bottom: 15px;
  }

  .index0{
    border-right: 10px solid gray;
  }

  .index1{
    border-right: 10px solid green;
  }

  .index2{
    border-right: 10px solid #48c774;
  }

  .index3{
    border-right: 10px solid #f9dd57;
  }

  .index4{
    border-right: 10px solid orange;
  }

  .index5{
    border-right: 10px solid rgb(255, 115, 0);
  }

  .index6{
    border-right: 10px solid #f14668;
  }

  .desktopContainer{
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>

<div class="container hidden-mobile index{result.qualityIndex} desktopContainer">
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

<div class="box hidden-desktop index{result.qualityIndex}">
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
