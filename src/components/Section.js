// класс Section , отвечает за отрисовку элементов на странице
export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items; //items — это массив данных, которые нужно добавить на страницу
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    this._containerSelector = containerSelector; //селектор контейнера, в который нужно добавлять созданные элементы
  };


  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(element) {
    //addItem принимает DOM-элемент и добавляет его в контейнер
    this._containerSelector.prepend(element);
  };
};

// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
