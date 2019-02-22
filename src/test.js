'use strict';
const boardTasks = document.querySelector(`.board__tasks`);
const mainFilterElement = document.querySelector(`.main__filter`);

const renderTemplate = (template = ``) => {
  const templateElement = document.createElement(`template`);
  templateElement.innerHTML = template;
  return templateElement.content;
};

const renderFilter = (data) => {
  const id = data.name.toLocaleLowerCase();
  const template = `
    <input
      type="radio"
      id="filter__${id}"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__${id}" class="filter__label">
      ${data.name}
      <span class="filter__${id}-count">${data.count}</span>
    </label>
  `;
  const fragment = renderTemplate(template);
  const input = fragment.querySelector(`input`);
  input.addEventListener(`change`, () => renderTasks(data.count));
  return fragment;
};

const renderFilters = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((filter) => fragment.appendChild(renderFilter(filter)));
  mainFilterElement.innerHTML = ``;
  mainFilterElement.appendChild(fragment);
};

const renderTask = () => {
  const template = `
    <article class="card card--pink card--repeat">
      ...
    </article>
  `;

  return renderTemplate(template);
};

const renderTasks = (count) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    fragment.appendChild(renderTask());
  }

  boardTasks.innerHTML = ``;
  boardTasks.appendChild(fragment);
};

const filtersData = [
  {name: `All`, count: 15},
  {name: `Overdue`, count: 2},
  {name: `Today`, count: 3},
  {name: `Favorites`, count: 1},
  {name: `Repeating`, count: 5},
  {name: `Tags`, count: 1},
  {name: `Archive`, count: 3},
];
renderFilters(filtersData);

