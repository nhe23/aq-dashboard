<script lang="ts">
	import ApolloClient from "apollo-client";
	import { client } from "./apollo";
	import { setClient } from "svelte-apollo";
	import MeasurementsList from "./MeasurementsList.svelte";
	setClient(client);
</script>

<style>
</style>

<main>
	<MeasurementsList />
</main>
