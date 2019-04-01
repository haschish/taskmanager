import Component from './component';

class Filter extends Component {
  constructor(data) {
    super(data);
    this.id = data.id;
    this._data = Object.assign({}, data);

    this._onFilter = null;
    this._onInputChange = this._onInputChange.bind(this);
  }

  get _innerTemplate() {
    const checked = this._data.checked ? `checked` : ``;

    return `
      <input type="radio" id="filter__${this.id}" class="filter__input visually-hidden" name="filter" ${checked} />
      <label for="filter__${this.id}" class="filter__label">
        ${this._data.name} <span class="filter__${this.id}-count">${this._data.count}</span>
      </label>
    `;
  }

  get _template() {
    return `
      <p style="margin: 0">
        ${this._innerTemplate}
      </p>
    `;
  }

  get _listeners() {
    return [
      {selector: `input`, eventName: `change`, fn: this._onInputChange},
    ]
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onInputChange(evt) {
    if (typeof this._onFilter === `function`) {
      this._onFilter(this, evt);
    }
  }

  _partialUpdate() {
    this._element.innerHTML = this._innerTemplate;
  }

  setData(data) {
    Object.assign(this._data, data);
  }
};

export default Filter;
