export class Section {
  constructor({data, renderer}, containerSelector) {
    this._initialData = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(item) {
    this._container.append(item);
  }

  renderItems() {
    this._initialData.forEach(item => {
      this._renderer(item);
    });
  }
}
