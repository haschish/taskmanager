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
  for (const task of data) {
    const taskView = new Task(task);
    const taskEditView = new TaskEdit(task);

    taskView.onEdit = () => {
      boardTasksElement.replaceChild(taskEditView.element, taskView.element);
      taskView.unrender();
    };

    taskEditView.onSave = (updatedData) => {
      taskView.setData(updatedData);
      boardTasksElement.replaceChild(taskView.element, taskEditView.element);
      taskEditView.unrender();
    };

    fragment.appendChild(taskView.element);
  }

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
