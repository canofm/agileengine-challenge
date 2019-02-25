import TagComparator from "../TagComparator";
import { JSDOM } from "jsdom";

describe("TagComparator", () => {
  it("should be a perfect match", () => {
    const tagComparator = new TagComparator(0.3);

    const dom = new JSDOM(`<h1 id="title">Title</h1><h1 id="title">OtherTitle</h1>`);
    const originalElement = dom.window.document.getElementById("title");
    const diffElement = dom.window.document.getElementById("title");

    expect(tagComparator.compare(originalElement, diffElement)).toBe(30);
  });

  it("shouldn't be a match at all", () => {
    const tagComparator = new TagComparator(0.3);
    const text = "SameText";
    const dom = new JSDOM(`<h1 id="title">${text}</h1><h2 id="subtitle">${text}</h2>`);
    const originalElement = dom.window.document.getElementById("title");
    const diffElement = dom.window.document.getElementById("subtitle");

    expect(tagComparator.compare(originalElement, diffElement)).toBe(0);
  });
});
