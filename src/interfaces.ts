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
