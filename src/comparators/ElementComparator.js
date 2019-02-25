/**
 * The approach is that every comparator has a coefficient to scoring how much the element beign analyze is similar to the original
 */

class ElementComparator {
  constructor(coefficient) {
    this.coefficient = coefficient;
  }

  compare(originalElement, otherElement, componentFinder = null) {
    return this.coefficient * this._compare(originalElement, otherElement, componentFinder);
  }
  // eslint-disable-next-line
  _compare(originalElement, otherElement, componentFinder = null) {
    throw new Error("Must implement this method!");
  }
}

export default ElementComparator;
