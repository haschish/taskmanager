import renderFilter from './make-filter';
import {getTasks, getFiltersData} from './data';
import Store from './store';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';
import * as filtersFn from './filters';
import Application from './Application';

const mainElement = document.querySelector(`main`);
const boardTasksElement = mainElement.querySelector(`.board__tasks`);
const mainFilterElement = mainElement.querySelector(`.main__filter`);
const controlWraperElement = mainElement.querySelector(`.control__btn-wrap`);

const onControlChange = ({target}) => {
  switch(target.value) {
    case 'tasks': return Application.showTasks();
    case 'statistic': return Application.showStatistics();
  }
};

const deleteTask = (task) => {
  const index = tasks.findIndex((item) => item === task);
  tasks[index] = null;
};

const renderFilters = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const filter = new Filter(item);
    filter.onFilter = onChangeFilter;
    fragment.appendChild(filter.element);
  });
  mainFilterElement.innerHTML = ``;
  mainFilterElement.appendChild(fragment);
};

const onChangeFilter = (filter) => {
  renderFilters(getFiltersData(tasks, filter.id));

  switch (filter.id) {
    case 'overdue': return renderTasks(tasks.filter(filtersFn.overdue(new Date())));
    case 'today': return renderTasks(tasks.filter(filtersFn.today(new Date())));
    default: return renderTasks(tasks.filter(filtersFn[filter.id]));
  }
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

    taskEditView.onDelete = () => {
      boardTasksElement.removeChild(taskEditView.element);
      taskEditView.unrender();
      deleteTask(task);
    }

    fragment.appendChild(taskView.element);
  }

  boardTasksElement.innerHTML = ``;
  boardTasksElement.appendChild(fragment);
};

const filters = getFiltersData(Store.getAll(), `all`);
renderFilters(filters);
renderTasks(Store.getAll());
controlWraperElement.addEventListener('change', onControlChange);
