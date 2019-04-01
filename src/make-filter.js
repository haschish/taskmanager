import {renderTemplate} from './util';

export default (data) => {
  const id = data.name.toLocaleLowerCase();
  const checked = data.checked ? `checked` : ``;
  const template = `

    <label for="filter__${id}" class="filter__label">
      <input type="radio" id="filter__${id}" class="filter__input visually-hidden" name="filter" data-count="${data.count}" ${checked} />
      ${data.name}
      <span class="filter__${id}-count">${data.count}</span>
    </label>
  `;
  return renderTemplate(template);
};
