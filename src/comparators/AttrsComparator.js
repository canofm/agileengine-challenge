import ElementComparator from "./ElementComparator";

class AttrsComparator extends ElementComparator {
  _compare(originalElement, otherElement) {
    const originalAttrs = originalElement.attributes;
    const otherAttrs = otherElement.attributes;
    const originalKeys = Object.values(originalAttrs).map(attr => attr.name);

    if (originalKeys.length === 0 && otherAttrs.length === 0) {
      return 100;
    }

    const score = originalKeys.reduce((accum, key) => {
      if (this.hasKeyAndValue(key, otherAttrs, originalAttrs.getNamedItem(key).value)) {
        return accum + 1;
      }
      return accum;
    }, 0);

    return (score * 100) / originalKeys.length;
  }

  hasKeyAndValue(key, attributes, currentValue) {
    const attr = attributes.getNamedItem(key);
    return attr != null && attr.value === currentValue;
  }
}

export default AttrsComparator;
