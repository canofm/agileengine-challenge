class XPath {
  path(element) {
    let parents = [],
      entry;

    for (; element; element = element.parentNode) {
      entry = element.tagName.toLowerCase();
      if (entry === "html") {
        break;
      }
      if (element.className) {
        entry += "." + element.className.replace(/ /g, ".");
      }
      parents.push(entry);
    }
    return parents.reverse().join(` > `);
  }
}

export default XPath;
