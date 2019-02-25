import ElementComparator from "./ElementComparator";

class CssComparator extends ElementComparator {
  _compare(originalElement, otherElement) {
    let score = 0;
    const originalStyles = originalElement.style._values;
    const otherStyles = otherElement.style._values;

    for (let key in originalStyles) {
      if (otherStyles.hasOwnProperty(key) && otherStyles[key] === originalStyles[key]) {
        score = score + 1;
      }
    }

    return (score * 100) / Math.max(Object.keys(originalStyles).length, 1); // Math.max with 1 is to prevent divide by 0 if the element hasn't style
  }
}

export default CssComparator;
