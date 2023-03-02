// класс Section , отвечает за отрисовку элементов на странице
export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem = (item) => {
    this._container.prepend(item);
  };

  renderItems(items) {
    items.reverse().forEach((item) => {
      return this._renderer(item);
    });
  }
}

// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
