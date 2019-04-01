const mainElement = document.querySelector(`main`);

const removeVisuallyHidden = (selector) => {
  const element = mainElement.querySelector(selector);
  element && element.classList.remove(`visually-hidden`);
};

class Application {
  static showStatistics() {
    this.hideAll();
    removeVisuallyHidden(`.statistic`);
  }

  static showTasks() {
    this.hideAll();
    removeVisuallyHidden(`.board`);
  }

  static hideAll() {
    mainElement.querySelectorAll(`.statistic, .result, .board`).forEach((element) => element.classList.add(`visually-hidden`));
  }
}

window.app = Application;
export default Application;
