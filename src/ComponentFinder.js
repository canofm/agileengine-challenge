class ComponentFinder {
  constructor({ logger, adjuster, comparators }) {
    this.logger = logger;
    this.adjuster = adjuster;
    this.comparators = comparators;
  }

  find(elementId, originalDom, diffDom) {
    this.maxScore = 0;
    const originalElement = this.getElementById(elementId, originalDom);

    const elementFound = this._find(originalElement, diffDom);
    if (!elementFound) {
      this.logger.error(`Not element similar to ${elementId} was found.`);
    } else {
      return elementFound;
    }
  }

  _find(originalElement, dom) {
    // Assume we're looking an element from body structure
    const allComponents = Object.values(dom.window.document.body.children);
    return this.adjuster
      .adjustSample(originalElement, allComponents) // there is no need to look everything element, we will take just the ones which has the same amount of children
      .reduce((maxElement, currentElement) => {
        const score = this.compare(originalElement, currentElement);
        if (score > this.maxScore) {
          this.maxScore = score;
          return currentElement;
        }
        return maxElement;
      }, allComponents[0]);
  }

  compare(originalElement, otherElement) {
    return this.comparators.reduce((accumScore, currentComparator) => {
      const score = currentComparator.compare(originalElement, otherElement, this); // passing down the componentFinder because of probably recursion strategy to compare childs
      return accumScore + score;
    }, 0);
  }

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
