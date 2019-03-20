import {createElement} from './util';

class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this._template);
      this.addListeners();
      this._updateClassList();
    }

    return this._element;
  }

  get classList() {
    return [];
  }

  _updateClassList() {
    if (!this._element) {
      return;
    }
    this._element.className = ``;
    const classes = [...this.classList].filter((item) => !!item);
    this._element.classList.add(...classes);
  }

  unrender() {
    this.removeListeners();
    this._element = null;
  }

  get _template() {
    return ``;
  }

  addListeners() {}

  removeListeners() {}
}

export default Component;
