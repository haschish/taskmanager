export const renderTemplate = (template = ``) => {
  const templateElement = document.createElement(`template`);
  templateElement.innerHTML = template;
  return templateElement.content;
};

