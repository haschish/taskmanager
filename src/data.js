import {getRandomItem, getRandomInt, getRandomBoolean} from './util';
import * as filtersFn from './filters';

const titles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
];

export const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const days = [
  `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`
];

const getTagsSet = () => {
  const tempTags = Array.from({length: tags.length}).map(() => getRandomItem(tags));
  return new Set(tempTags);
};

const getRepeatingDays = (value = getRandomBoolean()) => {
  return days.reduce((acc, day) => {
    acc[day] = value;
    return acc;
  }, {});
};

const generateRepeatingDays = () => {
  if (getRandomBoolean()) {
    return getRepeatingDays(false);
  }
  return getRepeatingDays();
};

const generateDate = () => {
  const date = new Date();
  const randomInt = getRandomInt(7);
  if (getRandomBoolean()) {
    date.setDate(date.getDate() + randomInt);
  } else {
    date.setDate(date.getDate() - randomInt);
  }

  return date;
};

export const getTask = (number) => ({
  id: number,
  title: getRandomItem(titles),
  dueDate: getRandomBoolean() ? generateDate() : null,
  tags: getTagsSet(),
  picture: getRandomBoolean() ? `http://picsum.photos/100/100?r=${Math.random()}` : null,
  color: getRandomItem(colors),
  repeatingDays: generateRepeatingDays(),
  isFavorite: getRandomBoolean(),
  isDone: getRandomBoolean()
});

export const getTasks = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(getTask(i));
  }
  return data;
};

const filters = [
  {id: `all`, name: `All`},
  {id: `overdue`, name: `Overdue`},
  {id: `today`, name: `Today`},
  {id: `repeating`, name: `Repeating`},
];

export const getFiltersData = (tasks, checkedId) => {
  return filters.map(({id, name}) => {
    let fn;
    switch (id) {
      case 'overdue': fn = filtersFn.overdue(new Date()); break;
      case 'today': fn = filtersFn.today(new Date()); break;
      default: fn = filtersFn[id];
    }

    return {
      id,
      name,
      count: tasks.filter(fn).length,
      checked: checkedId === id
    }
  });
};
