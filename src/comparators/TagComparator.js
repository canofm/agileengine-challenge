import ElementComparator from "./ElementComparator";

class TagComparator extends ElementComparator {
  _compare(originalElement, otherElement) {
    return originalElement.tagName === otherElement.tagName ? 100 : 0;
  }
}

export default TagComparator;
