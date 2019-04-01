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
      this._updateClassList();
      this._addListeners();
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
    this._removeListeners();
    this._element = null;
  }

  get _template() {
    return ``;
  }

  get _listeners() {
    return new Set([
      // {selector: ``, eventName: ``, fn: () => {}},
    ]);
  }

  _addListeners() {
    for (const {selector, eventName, fn} of this._listeners) {
      this.element.querySelector(selector).addEventListener(eventName, fn);
    }
  }

  _removeListeners() {
    for (const {selector, eventName, fn} of this._listeners) {
      this.element.querySelector(selector).removeEventListener(eventName, fn);
    }
  }
}

export default Component;
