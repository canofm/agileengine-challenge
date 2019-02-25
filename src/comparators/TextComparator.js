import ElementComparator from "./ElementComparator";

class TextComparator extends ElementComparator {
  _compare(originalElement, otherElement) {
    return originalElement.textContent.trim() === otherElement.textContent.trim() ? 100 : 0;
  }
}

export default TextComparator;
