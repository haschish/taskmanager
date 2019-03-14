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
    }

    return this._element;
  }

  destroy() {
    this._unbind();
    this._element = null;
  }

  get _template() {
    return ``;
  }

  _bind() {}

  addListeners() {}

  removeListeners() {}
}

export default Component;

export {Component};
