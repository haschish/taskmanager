import renderFilter from './make-filter';
import {getTasks} from './data';
import Task from './task';
import TaskEdit from './task-edit';

const boardTasksElement = document.querySelector(`.board__tasks`);
const mainFilterElement = document.querySelector(`.main__filter`);

const renderFilters = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((filter) => {
    const filterFragment = renderFilter(filter);
    const input = filterFragment.querySelector(`input`);
    input.addEventListener(`change`, onChangeFilter);
    fragment.appendChild(filterFragment);
  });
  mainFilterElement.innerHTML = ``;
  mainFilterElement.appendChild(fragment);
};

const onChangeFilter = ({target}) => {
  const count = parseInt(target.dataset.count, 10);
  renderTasks(tasks.slice(0, count));
};

const renderTasks = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const task = new Task(item);
    task.onEdit = () => {
      const taskEdit = new TaskEdit(item);
      taskEdit.onSave = () => {
        boardTasksElement.replaceChild(task.element, taskEdit.element);
      };
      boardTasksElement.replaceChild(taskEdit.element, task.element);
    };
    fragment.appendChild(task.element);
  });

  boardTasksElement.innerHTML = ``;
  boardTasksElement.appendChild(fragment);
};

const filtersData = [
  {name: `All`, count: 15, checked: true},
  {name: `Overdue`, count: 2},
  {name: `Today`, count: 3},
  {name: `Favorites`, count: 1},
  {name: `Repeating`, count: 5},
  {name: `Tags`, count: 1},
  {name: `Archive`, count: 3},
];
const tasks = getTasks(15);
renderFilters(filtersData);
renderTasks(tasks);
