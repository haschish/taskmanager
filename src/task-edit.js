import {colors} from './data';
import Task from './task';

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

const renderColors = ({id, color}) => {
  return colors.map((item) => ({id, color: item, checked: item === color}))
    .map(renderColorInput)
    .join(``);
};

const renderRepeatDay = (data) => {
  const checked = data.value ? `checked` : ``;

  return `
    <input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${data.day}-${data.id}"
      name="repeat"
      value="${data.day}"
      ${checked}
    />
    <label class="card__repeat-day" for="repeat-${data.day}-${data.id}">${data.day}</label>
  `;
};

const renderRepeatDays = ({id, days}) => {
  return Object.keys(days)
    .map((key) => ({id, day: key.toLowerCase(), value: days[key]}))
    .map(renderRepeatDay)
    .join(``);
};

class TaskEdit extends Task {
  constructor(data) {
    super(data);
    this._id = data.id;
    this._dueDate = new Date(data.dueDate);
    this._isFavorite = data._isFavorite;
    this._isDone = data.isDone;

    this._state = {
      isEdit: false
    };

    this._onSaveClick = this._onSaveClick.bind(this);
  }

  get classRepeat() {
    return this.isRepeat ? `card--repeat` : ``;
  }

  get _template() {
    return `
    <article class="card card--${this._color} ${this.classRepeat} card--edit">
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
              >${this._title}</textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>
                <fieldset class="card__date-deadline" disabled>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="${this._dueDate.getDate()} ${this._dueDate.toLocaleString(`en-us`, {month: `long`})}"
                      name="date"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="11:15 PM"
                      name="time"
                      value="${this._dueDate.toLocaleString(`en-us`, {hour: `numeric`, minute: `numeric`, hour12: true})}"
                    />
                  </label>
                </fieldset>
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">no</span>
                </button>
                <fieldset class="card__repeat-days" ${this.isRepeat ? `disabled` : ``}>
                  <div class="card__repeat-days-inner">
                    ${renderRepeatDays({id: this._id, days: this._repeatingDays})}
                  </div>
                </fieldset>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${[...this._tags].map(this._renderHashtag).join(``)}
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
            <label class="card__img-wrap card__img-wrap--empty">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="img/add-photo.svg"
                alt="task picture"
                class="card__img"
              />
            </label>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${renderColors({id: this._id, color: this._color})}
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>
    `;
  }

  setState(obj) {
    Object.assign(this._state, obj);
  }

  addListeners() {
    this.element.querySelector(`.card__save`).addEventListener(`click`, this._onSaveClick);
  }

  removeListeners() {
    this.element.querySelector(`.card__save`).removeEventListener(`click`, this._onSaveClick);
  }

  set onSave(fn) {
    this._onSave = fn;
  }

  _onSaveClick(evt) {
    evt.preventDefault();
    if (typeof this._onSave === `function`) {
      this._onSave(evt);
    }
  }
}

export default TaskEdit;
