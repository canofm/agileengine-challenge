import DocumentReader from "../DocumentReader";
import ComponentFinder from "../ComponentFinder";
import ChildrenSizeComparator from "../comparators/ChildrenSizeComparator";
import TextComparator from "../comparators/TextComparator";
import TagComparator from "../comparators/TagComparator";
import CssComparator from "../comparators/CssComparator";
import AttrsComparator from "../comparators/AttrsComparator";
import ChildrenComparator from "../comparators/ChildrenComparator";

describe("ComponentFinder", () => {
  let originalDOM, sample1, sample2, sample3, sample4;
  const componentFinder = new ComponentFinder({
    adjuster: new ChildrenSizeComparator(),
    comparators: [
      new TextComparator(0.2),
      new TagComparator(0.3),
      new CssComparator(0.1),
      new AttrsComparator(0.2),
      new ChildrenComparator(0.2)
    ]
  });
  const elementId = "make-everything-ok-button";

  beforeEach(async () => {
    const documentReader = new DocumentReader();
    [originalDOM, sample1, sample2, sample3, sample4] = await documentReader.getDOMs(
      "samples/sample-0-origin.html",
      "samples/sample-1-evil-gemini.html",
      "samples/sample-2-container-and-clone.html",
      "samples/sample-3-the-escape.html",
      "samples/sample-4-the-mash.html"
    );
  });

  it("getElementById", () => {
    const element = componentFinder.getElementById(elementId, originalDOM);

    expect(element.textContent.trim()).toBe("Make everything OK");
  });

  describe("find", () => {
    it("in sample 1", () => {
      expect(componentFinder.find(elementId, originalDOM, sample1).textContent.trim()).toBe(
        "Make everything OK"
      );
    });

    it("in sample 2", () => {
      expect(componentFinder.find(elementId, originalDOM, sample2).textContent.trim()).toBe(
        "Make everything OK"
      );
    });

    it("in sample 3", () => {
      expect(componentFinder.find(elementId, originalDOM, sample3).textContent.trim()).toBe(
        "Do anything perfect"
      );
    });

    it("in sample 4", () => {
      expect(componentFinder.find(elementId, originalDOM, sample4).textContent.trim()).toBe(
        "Do all GREAT"
      );
    });
  });
});
