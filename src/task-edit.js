import {colors} from './data';
import Task from './task';
import flatpickr from 'flatpickr';
import moment from 'moment';

const renderColorInput = (data) => {
  const checked = data.checked ? `checked` : ``;

  return `
    <input
      type="radio"
      id="color-${data.color}-${data.id}"
      class="card__color-input card__color-input--${data.color} visually-hidden"
      name="color"
      value="${data.color}"
      ${checked}
    />
    <label
      for="color-${data.color}-${data.id}"
      class="card__color card__color--${data.color}"
      >${data.color}</label
    >
  `;
};

const renderRepeatDay = (data) => {
  const checked = data.value ? `checked` : ``;
  const id = `repeat-${data.day.toLowerCase()}-${data.id}`;

  return `
    <input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="${id}"
      name="repeat"
      value="${data.day}"
      ${checked}
    />
    <label class="card__repeat-day" for="${id}">${data.day}</label>
  `;
};

class TaskEdit extends Task {
  constructor(data) {
    super(data);

    this._state = {
      showDeadline: data.dueDate ? true : false,
      showRepeatDays: this.isRepeat
    };

    this._onSaveClick = this._onSaveClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
    this._onClickDateToggle = this._onClickDateToggle.bind(this);
    this._onClickRepeatToggle = this._onClickRepeatToggle.bind(this);
    this._onChangeRepeatDays = this._onChangeRepeatDays.bind(this);
    this._onCardTextInput = this._onCardTextInput.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this._onTimeChange = this._onTimeChange.bind(this);
  }

  get repeatDaysTemplate() {
    return Object.entries(this._data.repeatingDays)
      .map(([key, value]) => ({id: this.id, day: key, value}))
      .map(renderRepeatDay)
      .join(``);
  }

  get colorsTemplate() {
    const {id, color} = this._data;
    return colors.map((item) => ({id, color: item, checked: item === color}))
      .map(renderColorInput)
      .join(``);
  }

  get classList() {
    return [`card`, `card--edit`, this.classColor, this.classRepeat];
  }

  get _innerTemplate() {
    return `
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${this._data.title}</textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._state.showDeadline ? `yes` : `no`}</span>
                </button>
                <fieldset class="card__date-deadline" ${this._state.showDeadline ? `` : `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="23 September" name="date" value="${this._formattedDate}"/>
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="11:15 PM" name="time" value="${this._formattedTime}"/>
                  </label>
                </fieldset>
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._state.showRepeatDays ? `yes` : `no`}</span>
                </button>
                <fieldset class="card__repeat-days" ${this._state.showRepeatDays ? `` : `disabled`}>
                  <div class="card__repeat-days-inner">
                    ${this.repeatDaysTemplate}
                  </div>
                </fieldset>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this._hashtagsTemplate}
                </div>
                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>
            <label class="card__img-wrap ${this.classImgWrapEmpty}">
              <input type="file" class="card__img-input visually-hidden" name="img" />
              <img src="${this._pictureUrl}" alt="task picture" class="card__img" />
            </label>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <fieldset class="card__colors-fieldset" style="border:none; padding: 0; margin: 0;">
                <div class="card__colors-wrap">
                  ${this.colorsTemplate}
                </div>
              </fieldset>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    `;
  }

  get _listeners() {
    return new Set([
      {selector: `.card__save`, eventName: `click`, fn: this._onSaveClick},
      {selector: `.card__delete`, eventName: `click`, fn: this._onDeleteClick},
      {selector: `.card__colors-fieldset`, eventName: `change`, fn: this._onColorChange},
      {selector: `.card__date-deadline-toggle`, eventName: `click`, fn: this._onClickDateToggle},
      {selector: `.card__repeat-toggle`, eventName: `click`, fn: this._onClickRepeatToggle},
      {selector: `.card__repeat-days`, eventName: `change`, fn: this._onChangeRepeatDays},
      {selector: `.card__text`, eventName: `input`, fn: this._onCardTextInput},
      {selector: `.card__date`, eventName: `change`, fn: this._onDateChange},
      {selector: `.card__time`, eventName: `change`, fn: this._onTimeChange},
    ]);
  }

  _addListeners() {
    super._addListeners();

    if (this._state.showDeadline) {
      flatpickr(this.element.querySelector(`.card__date`), {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(this.element.querySelector(`.card__time`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }
  }

  set onSave(fn) {
    this._onSave = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _onSaveClick(evt) {
    evt.preventDefault();
    if (typeof this._onSave === `function`) {
      this._onSave(this.getData(), evt);
    }
  }

  _onDeleteClick(evt) {
    console.log(`_onDeleteClick`);
    evt.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete(evt);
    }
  }

  _onColorChange({target}) {
    this._data.color = target.value;
    this._updateClassList();
  }

  _onClickDateToggle() {
    this.setState({showDeadline: !this._state.showDeadline});
  }

  _onClickRepeatToggle() {
    this.setState({showRepeatDays: !this._state.showRepeatDays});
  }

  _onChangeRepeatDays({target}) {
    this._data.repeatingDays[target.value] = target.checked;
  }

  _onCardTextInput({target}) {
    this._data.title = target.value;
  }

  _onDateChange({target}) {
    this._data.dueDate = moment(`${target.value} ${this._formattedTime}`, [`D MMMM LT`]).toDate();
    this.setState();
  }

  _onTimeChange({target}) {
    this._data.dueDate = moment(`${this._formattedDate} ${target.value}`, [`D MMMM LT`]).toDate();
    this.setState();
  }

  _partialUpdate() {
    this._element.innerHTML = this._innerTemplate;
  }

  setState(obj) {
    Object.assign(this._state, obj);
    this._removeListeners();
    this._partialUpdate();
    this._addListeners();
  }

  getData() {
    return Object.assign(super.getData(), {
      dueDate: this._state.showDeadline ? new Date(this._data.dueDate) : null,
      repeatingDays: this._state.showRepeatDays ? Object.assign({}, this._data.repeatingDays) : {},
    });
  }
}

export default TaskEdit;
