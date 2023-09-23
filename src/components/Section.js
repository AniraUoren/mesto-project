export class Section {
  _initialData;
  _renderer;
  _container;
  constructor({data, renderer}, containerSelector) {
    this._initialData = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(item) {
    this._container.append(item);
  }

  addItem (item) {
    this._container.prepend(item);
  }

  renderItems() {
    this._initialData.forEach(item => {
      this._renderer(item);
    });
  }
}
