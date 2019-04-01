import {getData} from './data';
let data;

class Store {
  static getAll() {
    if (!data) {
      data = getTasks(15);
    }
    return data;
  }

  static remove() {

  }
}

export default Store;
