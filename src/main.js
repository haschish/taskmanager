import renderFilter from './make-filter';
import {getTask} from './data';
import Task from './task';

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
    const task = new Task(getTask(i));
    fragment.appendChild(task.element);
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
