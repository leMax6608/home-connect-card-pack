export function registerElement(name: string, constructor: CustomElementConstructor): void {
  if (!customElements.get(name)) customElements.define(name, constructor);
}
