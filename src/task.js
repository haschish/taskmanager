import Component from './component';
import moment from 'moment';

const renderHashtag = (tag) => {
  return `
    <span class="card__hashtag-inner">
      <input class="card__hashtag-hidden-input" type="hidden" name="hashtag" value="${tag}" />
      <button type="button" class="card__hashtag-name">#${tag}</button>
      <button type="button" class="card__hashtag-delete">delete</button>
    </span>
  `;
};

const createData = (data) => {
  return Object.assign({}, data, {
    tags: new Set(data.tags),
    repeatingDays: Object.assign({}, data.repeatingDays),
    dueDate: data.dueDate ? new Date(data.dueDate) : null
  });
};

class Task extends Component {
  constructor(data) {
    super();
    this._data = createData(data);

    this._onEditClick = this._onEditClick.bind(this);
  }

  get _formattedDate() {
    return this._data.dueDate ? moment(this._data.dueDate).format(`D MMMM`) : ``;
  }

  get _formattedTime() {
    return this._data.dueDate ? moment(this._data.dueDate).format(`LT`) : ``;
  }

  get _hashtagsTemplate() {
    return [...this._data.tags].map(renderHashtag).join(``);
  }

  get classRepeat() {
    return this.isRepeat ? `card--repeat` : ``;
  }

  get classColor() {
    return `card--${this._data.color}`;
  }

  get classImgWrapEmpty() {
    return this._data.picture ? `` : `card__img-wrap--empty`;
  }

  get classList() {
    return [`card`, this.classColor, this.classRepeat];
  }

  get isRepeat() {
    return Object.values(this._data.repeatingDays).some((v) => v === true);
  }

  get _pictureUrl() {
    return this._data.picture ? this._data.picture : `img/add-photo.svg`;
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
            <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
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
                <fieldset class="card__date-deadline" ${this._data.dueDate ? `` : `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="23 September" name="date" value="${this._formattedDate}"/>
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="11:15 PM" name="time" value="${this._formattedTime}"/>
                  </label>
                </fieldset>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this._hashtagsTemplate}
                </div>
              </div>
            </div>
            <label class="card__img-wrap ${this.classImgWrapEmpty}">
              <input type="file" class="card__img-input visually-hidden" name="img" />
              <img src="${this._pictureUrl}" alt="task picture" class="card__img" />
            </label>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    `;
  }

  get _template() {
    return `
      <article">
        ${this._innerTemplate}
      </article>
    `;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  addListeners() {
    this.element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditClick);
  }

  removeListeners() {
    this.element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditClick);
  }

  _onEditClick(evt) {
    if (typeof this._onEdit === `function`) {
      this._onEdit(evt);
    }
  }

  getData() {
    return createData(this._data);
  }

  setData(data) {
    this._data = createData(data);
  }
}

export default Task;
