export default class LocalStorage {
  static getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return {};
    }
  }

  static setItem(key, value) {
    if (typeof value === 'object') {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return;
      } catch (e) {
        return false;
      }
    }

    localStorage.setItem(key, value);
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }
}
