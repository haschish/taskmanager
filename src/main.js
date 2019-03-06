import renderFilter from './make-filter';
import renderTask from './make-task';
import {getTask} from './data';

const boardTasks = document.querySelector(`.board__tasks`);
const mainFilterElement = document.querySelector(`.main__filter`);

const renderFilters = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((filter) => {
    const filterFragment = renderFilter(filter);
    const input = filterFragment.querySelector(`input`);
    input.addEventListener(`change`, () => renderTasks(filter.count));
    fragment.appendChild(filterFragment);
  });
  mainFilterElement.innerHTML = ``;
  mainFilterElement.appendChild(fragment);
};

const renderTasks = (count) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    fragment.appendChild(renderTask(getTask(i)));
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
