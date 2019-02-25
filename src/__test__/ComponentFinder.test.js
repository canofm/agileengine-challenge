import DocumentReader from "../DocumentReader";
import ComponentFinder from "../ComponentFinder";

describe("ComponentFinder", () => {
  let originalDOM;
  const componentFinder = new ComponentFinder({});
  const elementId = "make-everything-ok-button";

  beforeEach(async () => {
    const documentReader = new DocumentReader();
    [originalDOM] = await documentReader.getDOMs("samples/sample-0-origin.html");
  });

  it("getElementById", () => {
    const element = componentFinder.getElementById(elementId, originalDOM);

    expect(element.textContent.trim()).toBe("Make everything OK");
  });
});
