import Store from './store';
const statisticElement = document.querySelector(`.statistic`);

class Statistic {
  static show() {
    statisticElement.classList.remove(`visually-hidden`);
  }

  static hide() {
    statisticElement.classList.add(`visually-hidden`);
  }
}
