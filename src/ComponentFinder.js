class ComponentFinder {
  constructor({ logger, adjuster, comparators }) {
    this.logger = logger;
    this.adjuster = adjuster;
    this.comparators = comparators;
  }

  find(elementId, originalDom, diffDom) {
    const originalElement = this.getElementById(elementId, originalDom);

    const elementFound = this._find(originalElement, diffDom);
    if (!elementFound) {
      this.logger.error(`Not element similar to ${elementId} was found.`);
    } else {
      return elementFound;
    }
  }

  _find(originalElement, dom) {}

  getElementById(elementId, dom) {
    const element = dom.window.document.getElementById(elementId);
    if (!element) {
      this.logger.error(`Element ${elementId} not found`);
    } else {
      return element;
    }
  }
}

export default ComponentFinder;
