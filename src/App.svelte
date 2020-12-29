<script lang="ts">
	import ApolloClient from "apollo-client";
	import { client } from "./apollo";
	import { setClient } from "svelte-apollo";

	import MeasurementsDashboard from "./components/Measurements/MeasurementsDashboard.svelte";
	setClient(client);
</script>

<style>
</style>

<main>
	<MeasurementsDashboard />
</main>
