export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  rendererItems(data) {
    data.forEach((element) => {
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
