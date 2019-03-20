import {getRandomItem, getRandomInt, getRandomBoolean} from './util';

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

const getDate = () => {
  if (getRandomBoolean()) {
    return generateDate();
  }
  return null;
};

export const getTask = (number) => ({
  id: number,
  title: getRandomItem(titles),
  dueDate: getDate(),
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
