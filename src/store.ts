import { writable } from 'svelte/store';

export interface IFilter {
  key: "country"|"city"|null
  value: string
}

const filterDefault:IFilter ={
  key: null,
  value: ""
}

export const filterStore = writable(filterDefault);