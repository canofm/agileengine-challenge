import { JSDOM } from "jsdom";
import AttrsComparator from "../AttrsComparator";

describe("AttrsComparator", () => {
  it("should be a perfect match", () => {
    const attrsComparator = new AttrsComparator(0.2);
    // button from github hehehe :P
    const dom = new JSDOM(
      `<button id="button" class="btn btn-sm BtnGroup-item" type="submit" data-disable-with="Creating file…">Create new file</button>`
    );
    const button = dom.window.document.getElementById("button");
    expect(attrsComparator.compare(button, button)).toBe(20);
  });

  it("should return 5 since it only has one out of four attribute equal to original", () => {
    const attrsComparator = new AttrsComparator(0.2);
    const dom = new JSDOM(
      `<button id="btn-submit" class="btn btn-sm BtnGroup-item" type="submit" data-disable-with="Creating file…">Create new file</button>
      <button id="btn-cancel" class="btn btn-sm BtnGroup-item" type="cancel" data-disable-with="Cancel">Cancel</button>`
    );

    const expectedScore = 0.2 * 100 * (1 / 4); // 5
    const submitButton = dom.window.document.getElementById("btn-submit");
    const cancelButton = dom.window.document.getElementById("btn-cancel");
    expect(attrsComparator.compare(submitButton, cancelButton)).toBe(expectedScore);
  });

  it("shouldn't be a match at all", () => {
    const attrsComparator = new AttrsComparator(0.2);
    const dom = new JSDOM(
      `<button id="btn-submit" class="btn btn-sm BtnGroup-item" type="submit" data-disable-with="Creating file…">Create new file</button>
      <button id="btn-cancel" class="other class" type="cancel" data-disable-with="Cancel">Cancel</button>`
    );

    const submitButton = dom.window.document.getElementById("btn-submit");
    const cancelButton = dom.window.document.getElementById("btn-cancel");
    expect(attrsComparator.compare(submitButton, cancelButton)).toBe(0);
  });
});
