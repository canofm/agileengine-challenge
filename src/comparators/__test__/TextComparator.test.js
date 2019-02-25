import TextComparator from "../TextComparator";
import { JSDOM } from "jsdom";

describe("TextComparator", () => {
  it("should be a perfect match", () => {
    const text = "Same text";
    const dom = new JSDOM(`<h1 id="title">${text}</h1><h2 id="subtitle">${text}</h2>`);

    const originalElement = dom.window.document.getElementById("title");
    const diffElement = dom.window.document.getElementById("subtitle");

    const textComparator = new TextComparator(0.2);
    expect(textComparator.compare(originalElement, diffElement)).toBe(20);
  });

  it("shouldn't match at all", () => {
    const dom = new JSDOM(`<h1 id="title">Title</h1><h1 id="subtitle">OtherTitle</h1>`);

    const originalElement = dom.window.document.getElementById("title");
    const diffElement = dom.window.document.getElementById("subtitle");

    const textComparator = new TextComparator(0.2);
    expect(textComparator.compare(originalElement, diffElement)).toBe(0);
  });
});
