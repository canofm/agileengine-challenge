import ElementComparator from "./ElementComparator";

class ChildrenComparator extends ElementComparator {
  _compare(originalElement, otherElement, componentFinder) {
    const originalChilds = originalElement.children;
    const otherChilds = otherElement.children;
    let score = 0;
    for (let i = 0; i < Math.min(originalChilds.length, otherChilds.length); i++) {
      score += componentFinder.compare(originalChilds[i], otherChilds[i]);
    }

    return score / Math.max(originalChilds.length, otherChilds.length, 1);
  }
}

export default ChildrenComparator;
