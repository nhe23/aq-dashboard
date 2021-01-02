declare namespace svelte.JSX {
  interface HTMLInputElement<T> {
    onnewvalue: (e: any) => Promise<void>
  }
}