import {renderTemplate} from './util';
import { colors } from './data';

const renderDateInput = (date) => {
  return `
    <label class="card__input-deadline-wrap">
      <input
        class="card__date"
        type="text"
        placeholder="${date.getDate()} ${date.toLocaleString('en-us', {month: 'long'})}"
        name="date"
      />
    </label>
    <label class="card__input-deadline-wrap">
      <input
        class="card__time"
        type="text"
        placeholder="11:15 PM"
        name="time"
        value="${date.toLocaleString('en-us', {hour: 'numeric', minute: 'numeric', hour12: true})}"
      />
    </label>
  `;
};

const renderHashtag = (tag) => {
  return `
  <span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="${tag}"
      class="card__hashtag-hidden-input"
    />
    <button type="button" class="card__hashtag-name">
      #${tag}
    </button>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>
  `;
}

const renderColorInput = (data) => {
  const checked = data.checked ? 'checked' : '';

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

const renderColors = (data) => {
  return colors.map((color) => ({id: data.id, color, checked: color === data.color}))
    .map(renderColorInput)
    .join(``);
}

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

const renderRepeatDays = (data) => {
  const {id, repeatingDays: days} = data;
  return Object.keys(days)
    .map((key) => ({id, day: key.toLowerCase(), value: days[key]}))
    .map(renderRepeatDay)
    .join(``);
}

const isRepeating = (days) => {
  return Object.values(days).some((v) => v);
};

const isDeadline = (date) => {
  return date < new Date();
};

export default (data) => {

  const classes = [`card`, `card--${data.color}`];
  if (isRepeating(data.repeatingDays)) {
    classes.push('card--repeat');
  }

  if (isDeadline(data.dueDate)) {
    classes.push(`card--deadline`);
  }

  const template = `<article class="${classes.join(` `)}">
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
            >${data.title}</textarea>
          </label>
        </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">no</span>
              </button>
              <fieldset class="card__date-deadline" disabled>
                ${renderDateInput(data.dueDate)}
              </fieldset>
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">no</span>
              </button>
              <fieldset class="card__repeat-days" ${isRepeating(data.repeatingDays) ? 'disabled' : ''}>
                <div class="card__repeat-days-inner">
                  ${renderRepeatDays(data)}
                </div>
              </fieldset>
            </div>
            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${[...data.tags].map(renderHashtag).join(``)}
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
              ${renderColors(data)}
            </div>
          </div>
        </div>
        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;

  return renderTemplate(template);
};
