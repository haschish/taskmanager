export const renderTemplate = (template = ``) => {
  const templateElement = document.createElement(`template`);
  templateElement.innerHTML = template;
  return templateElement.content;
};

export const getRandomInt = (max = Number.MAX_SAFE_INTEGER) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const getRandomItem = (array) => array[getRandomInt(array.length - 1)];

export const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const createElement = (template = ``) => {
  const templateElement = document.createElement(`template`);
  templateElement.innerHTML = template;
  return templateElement.content.firstElementChild;
};
