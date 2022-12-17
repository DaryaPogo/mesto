export class Section {
  constructor({data, renderer}, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }
  rendererItems() {
    this._items.forEach((element) => {
      this._renderer(element);
    });
  }
  addItem(element) {
    this._containerSelector.append(element);
  }
  prependItem(element) {
    this._containerSelector.prepend(element);
  }
}