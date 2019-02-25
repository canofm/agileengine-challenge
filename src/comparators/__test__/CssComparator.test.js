import { JSDOM } from "jsdom";
import CssComparator from "../CssComparator";

describe("CssComparator", () => {
  it("should return perfect match", () => {
    const dom = new JSDOM(
      `<span id="someId" class="weirdClass" style="color:red; background-color: white; font-size: 13px;">Some weird text...</span>`
    );
    const element = dom.window.document.getElementById("someId");
    const cssComparator = new CssComparator(0.2);

    expect(cssComparator.compare(element, element)).toBe(20);
  });

  it("shouldn't be a match at all'", () => {
    const dom = new JSDOM(
      `<span id="someId" class="weirdClass" style="color:red; background-color: white; font-size: 13px;">Some weird text...</span>
      <h2 id="title">Title</h2>`
    );

    const originalElement = dom.window.document.getElementById("someId");
    const otherElement = dom.window.document.getElementById("title");
    const cssComparator = new CssComparator(0.2);

    expect(cssComparator.compare(originalElement, otherElement)).toBe(0);
  });

  it("should return 5 since it shares just one style with the original", () => {
    const dom = new JSDOM(
      `<span id="someId" class="weirdClass" style="color:red; background-color: white; font-size: 13px;">Some weird text...</span>
      <span id="otherId" class="weirdClass" style="color:blue; font-size: 13px;">Other weird text...</span>`
    );

    const originalElement = dom.window.document.getElementById("someId");
    const otherElement = dom.window.document.getElementById("otherId");
    const cssComparator = new CssComparator(0.2);

    expect(cssComparator.compare(originalElement, otherElement)).toBe(0.2 * ((1 * 100) / 3));
  });
});
