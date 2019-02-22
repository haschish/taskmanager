import {renderTemplate} from './util';

export default (data) => {
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
  return renderTemplate(template);
};
