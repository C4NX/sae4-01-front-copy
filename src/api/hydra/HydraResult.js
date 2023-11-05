import HydraPagination from './HydraPagination';

/**
 * A class representing a Hydra result.
 * @class
 */
export default class HydraResult {
  /**
   * Create a Hydra result.
   * @param {object} data - The data to store in the result.
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * Get the total number of items in the collection.
   * @return {number} The total number of items in the collection.
   */
  get totalItems() {
    return this.data['hydra:totalItems'] ?? (this.data['@id'] != null ? 1 : 0);
  }

  /**
   * Get all the items in the collection or the item if the result is not a collection.
   * @returns {object[]|object} The items in the collection or the item if the result is not a collection.
   */
  get member() {
    if (!this.isArray) {
      return this.data;
    }
    return this.data['hydra:member'];
  }

  /**
   * Get if the result is a collection.
   */
  get isArray() {
    return this.data['hydra:member'] instanceof Array;
  }

  /**
   * Get a hydra member property by name.
   * @param {string} name - The name of the property to get.
   * @param {any} _default - The default value to return if the property is not found.
   * @returns {object} The value of the property or the default value if the property is not found.
   */
  memberGet(name, _default = undefined) {
    if (this.isArray) {
      return this.data['hydra:member'].map((x) => x[name] ?? _default);
    }
    return this.data[name] ?? _default;
  }

  get(key, _default = undefined) {
    return this.data[key] ?? _default;
  }

  isType(type) {
    return this.data['@type'] === type;
  }

  getPagination() {
    return new HydraPagination(this.data['hydra:view']);
  }
}
