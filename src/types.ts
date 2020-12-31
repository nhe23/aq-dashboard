export interface MeasurementResult {

}

export interface Columns {
  sizeClass: string;
  keys: Key[];
}

export interface Key {
  sortedDesc: boolean;
  name: string;
  internalName: string;
}

export interface CitiesStartsWith{
  data:{
    citiesStartsWith: Array<CitiesResult>
  }
}

export interface CitiesResult{
  name: string
}