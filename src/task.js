import Component from './component';

class Task extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._color = data.color;
    this._tags = new Set(data.tags);
    this._repeatingDays = Object.assign({}, data.repeatingDays);
    this._picture = data.picture;
    this._element = null;

    this._onEditClick = this._onEditClick.bind(this);
  }

  _renderHashtag(tag) {
    return `
      <span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="${tag}"
          class="card__hashtag-hidden-input"
        />
        <button type="button" class="card__hashtag-name">#${tag}</button>
        <button type="button" class="card__hashtag-delete">delete</button>
      </span>
    `;
  }

  get classRepeat() {
    return this.isRepeat ? `card--repeat` : ``;
  }

  get isRepeat() {
    return Object.values(this._repeatingDays).some((v) => v === true);
  }

  get _template() {
    return `
    <article class="card card--${this._color} ${this.classRepeat}">
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
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${[...this._tags].map(this._renderHashtag).join(``)}
                </div>
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
}

export default Task;
