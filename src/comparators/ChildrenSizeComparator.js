class ChildrenSizeComparator {
  adjustSample(originalElement, children) {
    const results = [];
    const originalSize = originalElement.children.length;
    children.forEach(child => this.addIfHasSameChildrenSize(originalSize, child, results));
    return results;
  }

  addIfHasSameChildrenSize(originalSize, element, results) {
    if (originalSize === element.children.length) {
      return results.push(element);
    } else if (element.children.length > 0) {
      return Object.values(element.children).forEach(child =>
        this.addIfHasSameChildrenSize(originalSize, child, results)
      );
    }
  }
}

export default ChildrenSizeComparator;
